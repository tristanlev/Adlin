<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="close" @click="$emit('closeModal')">
        <img class="close-img" src="~/assets/images/close.png" alt="" />
      </div>
      <h6>{{ roomName }}</h6>
        <div class="begin-date-picker-wrapper">
          <p>Debut de la reservation: </p>
          <DatePicker format="DD/MM/YYYY H:i" width="300px" v-model="beginDate"></DatePicker>
        </div>
        <div class="end-date-picker-wrapper">
          <p>Debut de la reservation: </p>
          <DatePicker format="DD/MM/YYYY H:i" width="300px" v-model="endDate"></DatePicker>
        </div>
        <div>
          <p class="error-msg">{{errorMsg}}</p>
        </div>
        <div>
          <button class="adlin-btn"  v-bind:class="{ invalidBtn: isActive }" @click="formSubmit()">Reserver</button>
        </div>
    </div>
  </div>
</template>
 
<script>

import axios from 'axios'

export default {
  data() {
    return {
      isActive: true,
      beginDate: '',
      endDate: '',
      errorMsg: ''
    }
  },
  props: {
    roomName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  watch: {
    'beginDate': function (newValue, oldValue) {
      this.$data.isActive = (this.$data.beginDate != '' && this.$data.endDate != '') ? false : true
    },
    'endDate': function (newValue, oldValue) {
      this.$data.isActive = (this.$data.beginDate != '' && this.$data.endDate != '') ? false : true
    }
  },
  methods: {
    async formSubmit() {
      await axios.post('http://localhost:3001/api/rooms', {
        roomId: this.roomName, 
        beginDate: this.$data.beginDate, 
        endDate: this.$data.endDate, 
      })
      .then(response => {
        this.$emit('closeModal')
      })
      .catch(err => {
        console.log('Cannot reserve for this date!');
        console.log(err);
        this.$data.errorMsg = 'Cannot reserve for this date!';
      })
    }
  }
}
</script>

<style scoped>

.invalidBtn {
  background-color: gray;
  pointer-events: none;
  box-shadow: 0px 3px gray;
}

.invalidBtn:hover {
  background-color: gray;
  cursor: not-allowed;
  box-shadow: 0px 3px gray;
  transform: none;
}

.error-msg {
  color: red;
}

.begin-date-picker-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.end-date-picker-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000b6;
}

.modal {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: white;
  height: 350px;
  width: 500px;
  margin-top: 10%;
  padding: 10px 0;
  border-radius: 20px;
}

.close {
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
  cursor: pointer;

}

.close-img {
  height: 20px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 0 0 15px 0;
}

p {
  font-size: 16px;
  margin: 10px;
}

.adlin-btn {
  margin-top: 25px;
}

</style>