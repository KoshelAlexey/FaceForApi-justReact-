module.exports = {
	entry : "./src/main.js",
	output: {
		filename: "./lib/bundle.js"
	},
	module:{
		
		
		rules:[
			{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
			},
			{
			test: /\.html$/, 
			use: [ "html-loader" ] 
			},
			{
			test: /\.(js|jsx)$/,
			loader: "babel-loader",
			exclude: [ /node_modules/ ],
			options: {
				presets: [ "react", "env" ]
				}
			},
			{
			test: /\.(jpe?g|png|gif|svg)$/i,
			use: [ 'url-loader?limit=10000', 'img-loader' ]
			}
		]
	}	
}	
        
      
    
  
		
	
	
