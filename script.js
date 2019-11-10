// 9277576
// 9293668
var app = new Vue({
	el: '#app',
	data: {
		message: '',
		lista: []
	},
	methods:{
		adicionaItem: function(){
			this.lista.push(this.message)
			this.message = ""
		},
		apaga: function(a){
			this.lista.splice(this.lista.indexOf(a),1);
		}
	}
});