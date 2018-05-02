var vm = new Vue({
  el:'#app',
  data: {
    signUp: false,
    newUser: {name:'',surname:'',email:'',password:''},
    logIn: false,
    userLogin: {email:'',password:''},
    is404: false,
    is401: false,
    token: '',
    currentUser: null,
    add: false,
    newHouse: {admin:'',city:'',address:'',price:null},
    systemMessage: null,
    houses: [{_id:'',admin:'',city:'',address:'',price:null,likes:''}],
    citySearch: '',
    showRentForm:false,
    users: [],
    rent:{start:'',end:''},
    account: false,
    rentAHouse: false
  },
  methods: {
    signup: function() {
      this.systemMessage = null;
        this.$http.post(`http://localhost:3001/signup`, this.newUser)
        .then(response=>{   //E' un metodo dove ci aspettiamo qualcosa in output ,
        this.systemMessage = 'signedUp';
          this.signUp = !this.signUp;
        });
    },
    login: function() {
      this.systemMessage = null;
       this.$http.post(`http://localhost:3001/login`, this.userLogin)
        .then(response=>{
          this.systemMessage = 'logged';
          localStorage.setItem('token', response.body.token);
          this.me();
          this.logIn = !this.logIn;
        }).catch((response=>{
            if(response.status == 404){
              this.is404 = true;
            }
            else if ( response.status == 401){
              this.is401 = true;
            }
        }));
    },
    logout: function() {
      this.systemMessage = null;
      this.systemMessage = 'logout';
        this.currentUser = null;
        localStorage.removeItem('token');
        this.account = !this.account;
    },
    addNewHouse: function() {
      this.systemMessage = null;
        this.$http.post(`http://localhost:3001/houses?token=${localStorage.getItem('token')}`, this.newHouse)
        .then(response=>{
          this.systemMessage = 'houseAdded';
          this.add = !this.add;
        });
    },
    Allhouses() {
      this.$http.get(`http://localhost:3001/houses`)
      .then(response=>{this.houses = response.body;})
    },
    rentHouse: function(idHouse) {
      this.systemMessage = null;
        this.$http.post(`http://localhost:3001/houses/${idHouse}/rent?token=${localStorage.getItem('token')}`, this.rent)
        .then(response=>{
          this.systemMessage = 'houseRented';
        }).catch((response=>
        {
          console.log(response.body);
        }));
    },
    /*
    Aggiungere un like all'annuncio della casa
    like: function(idHouse) {
      this.systemMessage = null;
        this.$http.post(`http://localhost:3001/houses/${idHouse}/like?token=${localStorage.getItem('token')}`, this.like)
        .then(response=>{
          this.systemMessage = 'likeAdded';
        }).catch((response=>
        {
          console.log(response.body);
        }));
    },
    */
    getAllUsers: function() {
        this.$http.get(`http://localhost:3001/users?token=${localStorage.getItem('token')}`)
        .then(function(response){
            this.users = response.body;
        })
    },

    me: function() {
        this.$http.get(`http://localhost:3001/me?token=${localStorage.getItem('token')}`)
        .then(function(response){
          console.log("response:", response);
          this.currentUser = response.body;
        })
    }
  },
  created: function() {  // Created è il metodo avviato in automatico quando si aggiorna il browser
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.me();
      this.Allhouses();
      this.getAllUsers();
//      this.like();
    }
  }
})
