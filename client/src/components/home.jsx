import React, { Component } from 'react'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state= {
            title:'',
            description:'',
            link:''
        }
    }
    TextBoxVal(e){
        this.setState({
            [e.target.name]:e.target.value
        })
  
}

    
 async  submitPost(e){
        const userPost=this.state
        console.log(userPost)
      await fetch('/users',{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userPost)
          }).then(res=>{res.json()
          console.log(res)
 }).then(data=>{
            console.log(data)
            if(data){
                console.log(data)
                this.setState({
                    title:'',
                    description:'',
                    link:''
                })
              }
              else
              alert(data.message)
          }).catch(err=>console.error(err));
    }

  render() {
    return (
      <div>
        <label htmlFor="title">Title:</label><input type="text" name="title" value={this.state.title} onChange={(e)=>this.TextBoxVal(e)}/>
       <br/>
       <label htmlFor="description">Description:</label><input type="text" name="description" value={this.state.description} onChange={(e)=>this.TextBoxVal(e)}/>
         <br/>
       <label htmlFor="link">Link:</label><input type="text" name="link" value={this.state.link} onChange={(e)=>this.TextBoxVal(e)}/>
       <button onClick={this.submitPost.bind(this)}>Submit</button>
      </div>
    )
  }
}
