(function(){

  window.addEventListener('offline', function(e) { alert('Sorry, but there is no internet connection. Please connect to the internet and try again.'); });

  //firebase code
  var config = {
    apiKey: "AIzaSyDa7sXCuJ1aTbWATz5_Z0IytPphI85hbwA",
    authDomain: "dnd-chat-app-6e815.firebaseapp.com",
    databaseURL: "https://dnd-chat-app-6e815.firebaseio.com",
    projectId: "dnd-chat-app-6e815",
    torageBucket: "dnd-chat-app-6e815.appspot.com",
    messagingSenderId: "868096860665",
    appId: "1:868096860665:web:a782888f6ecb7e515e9d28",
    measurementId: "G-FB117FS82B"
  };


  firebase.initializeApp(config);          
  // Check to see if you are logged in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user == null) {
      username = "Anomynous";
      return;

    } else {
      username = user.displayName;
      userId = user.uid; // you can also get .displayName, .photoURL, .email
      userphoto = user.photoURL;
                
    } // end user null check

  }); // end check auth state

  var database = firebase.database();
  var cur_time = Date.now();

  function signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) { 
    window.location.replace("fbtest.html");
    });
  }


  function sendMessage(time) {

    try {
      //message input
      var message1 = document.getElementById("message-to-send").value;
      var message = message1.slice(0, -1);
      var js_time = time;
      var js_ntime = Date.now();

      var tweetid = firebase.database().ref('messages/').push(
        {"message": message, 
         "name": username,
         "sender": userId, 
         "time": js_time,
         "js_time": js_ntime});
    }

    catch(error) {
      alert("Message could not be sent due to: " + error );
    };

    return false;
    }

  var url;
  var url2;

  var chat = {
    messageToSend: '',
    messageResponses: [
    ],
    init: function() {
      this.cacheDOM();
      this.bindEvents();
      this.render();
    },
    cacheDOM: function() {
      this.$chatHistory = $('.chat-history');
      this.$button = $('button');
      this.$textarea = $('#message-to-send');
      this.$chatHistoryList =  this.$chatHistory.find('ul');
      url = this.$chatHistoryList;
      url2 = this.$chatHistory;
    },
    bindEvents: function() {
      this.$button.on('click', this.addMessage.bind(this));
      this.$textarea.on('keyup', this.addMessageEnter.bind(this));
    },

    render: function() {
      this.scrollToBottom();
      if (this.messageToSend.trim() !== '') {
        var template = Handlebars.compile( $("#message-template").html());
        time = this.getCurrentTime();
        var context = { 
          messageOutput: this.messageToSend,
          time: this.getCurrentTime(),
          name: username,
        };

        //goto html
        this.$chatHistoryList.append(template(context));
        this.scrollToBottom();
        sendMessage(time);
        this.$textarea.val('');


         
        // responses for bots
        /*
        var templateResponse = Handlebars.compile( $("#message-response-template").html());
        var contextResponse = { 
          response: this.getRandomItem(this.messageResponses),
          time: this.getCurrentTime()
        };
        
        setTimeout(function() {
          this.$chatHistoryList.append(templateResponse(contextResponse));
          this.scrollToBottom();
        }.bind(this), 1500);
        */ 
      }
      
    },
    
    addMessage: function() {
      this.messageToSend = this.$textarea.val()
      this.render();         
    },
    addMessageEnter: function(event) {
        // enter was pressed
        if (event.keyCode === 13) {
          this.addMessage();
        }
    },
    scrollToBottom: function() {
       this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
    },
    getCurrentTime: function() {
      return new Date().toLocaleTimeString().
              replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    },
    getRandomItem: function(arr) {
      return arr[Math.floor(Math.random()*arr.length)];
    }
    
  };
  
  chat.init();
  
  var searchFilter = {
    options: { valueNames: ['name'] },
    init: function() {
      var userList = new List('people-list', this.options);
      var noItems = $('<li id="no-items-found">No items found</li>');
      
      userList.on('updated', function(list) {
        if (list.matchingItems.length === 0) {
          $(list.list).append(noItems);
        } else {
          noItems.detach();
        }
      });
    }
  };

  function getData(){
    try{
      firebase.database().ref('messages').limitToLast(3).once('value').then(function(snapshot) {
        values = Object.values(snapshot.val());

        for(let i = 0; i < 3; i++){
          if(values[i].sender != userId){
            if(values[i].js_time > cur_time){
              cur_time = values[i].js_time;
              console.log(values[i]);

              var templateResponse = Handlebars.compile( $("#message-response-template").html());
              var contextResponse = { 
                response: values[i].message,
                time: values[i].time,
                name: values[i].name
              };
                
              setTimeout(function() {
                url.append(templateResponse(contextResponse));
                url2.scrollTop(url2[0].scrollHeight);
              }.bind(this), 1500);
            }
          }
        }
      });
    }
    catch(error){
      alert("Data could not be received due to" + error);
    }
  }

  //Semi Real Time 
  time=setInterval(function(){
    getData();
  },0500);
  
  searchFilter.init();
  
})();