// 9277576
// 9293668

var listBody = Vue.extend({
	data: function () {
		return {
			list: []
		}
	},
	template: '<ul class="list-group">' +
              '<li v-for="item in list" class="list-group-item mt-2">' +
			  '<div class="row">' +
			  '<div class="col-11">' +
			  '{{item}}' +
			  '</div>' +
			  '<div class="col-1">' +
			  '<button type="button" class="btn btn-outline-danger btn-sm" v-on:click="erase(item)">Delete</button>' +
			  '</div>' +
			  '</div>' +
			  '</li>' +
			  '</ul>',
	methods:{
		addItem: function(message, id){
			if (message != "") {
				var response = axios
					.post('/createItem', {data: message, owner: id});
				this.list.push(message);
			}
		},
		erase: function(a){
			var activeComponent = document.querySelector('#listCarousel .carousel-inner .carousel-item.active');
			for(var i = 0; i < this.$parent.$children.length && this.$parent.$children[i].$el != activeComponent; i++);
			var response = axios
				.post('/deleteItem', {data: a.$el, owner: i});
			this.list.splice(this.list.indexOf(a), 1);
		},
		remove: function(id) {
			var response = axios
				.post('/deleteList', {owner: id});
            this.$destroy();
			this.$el.parentNode.removeChild(this.$el);
        },

	}
});
Vue.component('list-body', listBody)

var listHead = Vue.extend({
	data: function () {
		return {
			title: '',
			imageURL: ''
		}
	},
	template: '<div>' +
			  '<img :src="imageURL" alt="image" class="img-responsive">' +
			  '<div class="container">' +
			  '<div class="carousel-caption">' +
			  '<h1>{{ title }}</h1>' +
			  '</div>' +
			  '</div>' +
			  '</div>',
	methods: {
		changeTitleAndImage: function(name, URL, id) {
			alert(name)
			alert(URL)
			alert(id)
			var response = axios
				.post('/editList', {title: name, URL: URL, id: id});
			this.title = name;
			this.imageURL = URL;
		},
		remove: function() {
            this.$destroy();
			this.$el.parentNode.removeChild(this.$el);
        },
	}
});
Vue.component('list-head', listHead);

var app = new Vue({
	el: '#app',
	data: {
		message: '',
	},
	methods:{
		addItem: function(){
			var activeComponent = document.querySelector('#listCarousel .carousel-inner .carousel-item.active');
			for(var i = 0; i < this.$children.length && this.$children[i].$el != activeComponent; i++);
			this.$children[i].addItem(this.message, i);
			this.message = '';
		},
		changeTitleAndImage: function() {
			var title = document.querySelector('#list-title-input').value;
			var url = document.querySelector('#list-image-url').value;
			var activeComponent = document.querySelector('#myCarousel .carousel-inner .carousel-item.active');
			for(var i = 0; i < this.$children.length && this.$children[i].$el != activeComponent; i++);
			this.$children[i].changeTitleAndImage(title, url, i);
		},
		removeInstance: function() {
			var activeComponent = document.querySelector('#myCarousel .carousel-inner .carousel-item.active');
			var activeComponentBody = document.querySelector('#listCarousel .carousel-inner .carousel-item.active');
			var myNodeList = document.querySelectorAll('#myCarousel .carousel-inner .carousel-item');
			var len = myNodeList.length;
			if (len == 1) {
				alert("Can't remove the last list!");
				return;
			}
			document.querySelector('#next').click();
			len = this.$children.length
			for(var i = 0; i < len && this.$children[i].$el != activeComponent; i++);
			this.$children[i].remove();
			if (this.$children.length == len)
				this.$children.splice(i, 1);
			len = this.$children.length
			for(var i = 0; i < len && this.$children[i].$el != activeComponentBody; i++);
			this.$children[i].remove(i);
			if (this.$children.length == len)
				this.$children.splice(i, 1);
		},
		addInstance: function() {
			var response = axios
				.post('/createList', {title: '', URL: '', id: this.$children.length});
			bodyInstance = new listBody();
			headInstance = new listHead();
			bodyInstance.$mount();
			headInstance.$mount();
			bodyInstance.$el.className = 'list-group carousel-item';
			headInstance.$el.className = 'carousel-item';
			this.$children.push(bodyInstance);
			this.$children.push(headInstance);
			document.querySelector('#listCarousel .carousel-inner').appendChild(bodyInstance.$el);
			document.querySelector('#myCarousel .carousel-inner').appendChild(headInstance.$el);
		}
	}
});

$(document).ready(function(){
  // Enable Carousel Controls
  $(".left").click(function(){
    $("#myCarousel").carousel("prev");
	$("#listCarousel").carousel("prev");
  });
  $(".right").click(function(){
    $("#myCarousel").carousel("next");
	$("#listCarousel").carousel("next");
  });
});