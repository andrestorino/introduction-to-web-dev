// 9277576
// 9293668
var app = new Vue({
	el: '#app',
	data: {
		message: '',
		list: []
	},
	methods:{
		addItem: function(){
			if (this.message != "") {
				this.list.push(this.message)
				this.message = ""
			}
		},
		erase: function(a){
			this.list.splice(this.list.indexOf(a), 1);
		}
	}
});