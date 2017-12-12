<template>
  <div v-if="user" class="card">
    <div v-show="canRedeemProduct" class="active canRedeem">
      <div id="redeem">
        <div class="cost">
          <p>{{ product.cost }}</p>
          <img id="coin" src="../assets/coin.svg" alt="" />
        </div>
        <button @click.prevent="redeemProduct(product._id)">Redeem Now</button>
      </div>
    </div>
    <div v-show="!canRedeemProduct" class="active cannotRedeem">
      <div id="redeem">
        <div class="cost">
          <span>You need {{ necessaryPoints }}</span>
          <img id="coin" src="../assets/coin.svg" alt="" />
        </div>
        <button @click.prevent="getMorePoints(product._id)">Get more points</button>
      </div>
    </div>
    <div class="card-image">
      <div class="buy-icon" v-if="canRedeemProduct">
        <img src="../assets/buy-blue.svg" alt="">
      </div>
      <div v-else id="points">
        <span>You need {{ necessaryPoints }}</span>
        <img id="coin" src="../assets/coin.svg"  alt="" />
      </div>
      <figure>
        <img :src='product.img.url' :alt='product.name' />
      </figure>
    </div>
    <div class="card-content">
      <hr>
      <span>{{ product.category }}</span>
      <p>{{ product.name }}</p>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import trae from 'trae'
import { mapState } from 'vuex'
import 'babel-polyfill';

export default {
  props: ['product'],
  computed: {
    ...mapState(['user']),
    canRedeemProduct() {
      return this.product.cost < this.user.points
    },
    necessaryPoints() {
      return this.product.cost - this.user.points
    }
  },
  methods: {
    async redeemProduct(productId) {
      const id = productId

      trae.defaults({
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTE0YWIwY2ViZGZiYzAwOWJmM2ZiNGQiLCJpYXQiOjE1MTEzMDM5NDh9.FVSrtY7tH9S-E1YtVlQqpbM-GE6hjD6GgphVgS-WwXk'
        }
      })

      const { value: product } = await swal({
        type: 'info',
        title: 'Redeeming product..',
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading()
          trae.post("https://aerolab-challenge.now.sh/redeem", { productId: id })
            .then((res) => {
              swal({
                type: 'success',
                title: 'The product was redeemed with success!',
                allowOutsideClick: false,
              }).then(() => {
                setTimeout(() => {
                  location.reload()
                }, 200)
              })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    },
    async getMorePoints() {

      const { value: amountSelected } = await swal({
        title: 'Select the amount of points',
        input: 'select',
        inputOptions: {
          "1000": "1000",
          "5000": "5000",
          "7500": "7500"
        },
        inputPlaceholder: 'Select amount',
        showCancelButton: true,
        allowOutsideClick: false,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            resolve()
          })
        }
      })

      if (amountSelected) {
        
        trae.defaults({
          'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTE0YWIwY2ViZGZiYzAwOWJmM2ZiNGQiLCJpYXQiOjE1MTEzMDM5NDh9.FVSrtY7tH9S-E1YtVlQqpbM-GE6hjD6GgphVgS-WwXk'
          }
        })

        const { value: points } = await swal({
          type: 'info',
          title: 'Adding points..',
          allowOutsideClick: false,
          onOpen: () => {
            swal.showLoading()
            trae.post("https://aerolab-challenge.now.sh/user/points", { amount: parseInt(amountSelected) })
              .then((res) => {
                swal({
                  type: 'success',
                  title: `${amountSelected} points were added with success!`,
                  allowOutsideClick: false,
                }).then(() => {
                  setTimeout(() => {
                    location.reload()
                  }, 200)
                })
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        
      }
    }
  }
}
</script>

<style>
  .card {
    margin-right: 10px;
    margin-bottom: 10px;
    transition: all .3s;
  }

  .card-content {
    padding-top: 0;
  }

  .card-content span {
    color: #999;
    font-weight: 400;
    font-size: 1em;
  }

  .card-content p {
    font-weight: 600;
  }

  .buy-icon {
    padding: 10px;
    position: absolute;
    right: 0;
    z-index: 1000;
  }
  
  .card:hover .buy-icon img{
    display: block;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 50px; /* Width of new image */
    height: 50px; /* Height of new image */
    padding-left: 50px; /* Equal to width of new image */
    background: url('../assets/buy-white.svg') no-repeat;
  }

  #points {
    display: flex;
    align-items: center;
    background: rgba(120,120,120,.85);
    color: white;
    border-radius: 20px;
    padding: 4px 8px 4px 12px;
    width: max-content;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: .8em;
    z-index: 1000;
  }

  .card:hover #points{
    display: none;
  }

  #coin {
    padding-left: 4px;  
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 50px rgba(0,0,0,.8); 
  }

  .card .active {
    display: none;
    width: 100%;
  }

  .card:hover .active {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
  }

  .active.canRedeem {
    background-color: rgba(41,182,246,.8);
  }

  .active.cannotRedeem {
    background-color: rgba(244,67,54,.8);
  }

  .card:hover .active #redeem {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .card:hover .active #redeem .cost {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: white;
    width: max-content;
  }

  .card:hover .active #redeem .cost p {
    font-size: 1.5em;
    padding: 10px;
    padding-right: 0;
  }

  .card:hover .active #redeem button {
    background: white;
    border-radius: 2em;
    padding: 10px;
    width: 80%;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1em;
    color: #555;
  }
</style>