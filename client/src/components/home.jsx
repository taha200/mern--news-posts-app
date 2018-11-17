import React, { Component } from 'react'

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state= {
            title:'',
            description:'',
            link:'',
            Posts:[]
        }
        fetch('http://localhost:8000').then(res=>res.json()).then(data=>{
    const Postsfetch = data
  this.setState({
    Posts:Postsfetch
  })
  console.log(this.state.Posts)
  })
    }
    TextBoxVal(e){
        this.setState({
            [e.target.name]:e.target.value
        })
  
}
 componentWillMount(){

   fetch('http://localhost:8000').then(res=>res.json()).then(data=>{
    const Postsfetch = data
  this.setState({
    Posts:Postsfetch
  })
  console.log(this.state.Posts)
  })
}
    
 async  submitPost(e){
  e.preventDefault()
  const userPost=this.state
await fetch('http://localhost:8000/users',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userPost)
    }).then(res=>res.json()).then(data=>{
      console.log(data)
      if(data){
          console.log(data)
          const Postinsert = this.state.Posts
          Postinsert.push(data)
          this.setState({
              title:'',
              description:'',
              link:'',
              Posts:Postinsert
          })
        }
        else
        alert('error')
    }).catch(err=>console.error(err));
    }
    async Postdel(id){
      await fetch('http://localhost:8000/users/remove/'+id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }).then(res=>res.json()).then(data=>{
        }).catch(err=>console.error(err));
  }

  render() {

    if(!this.state.Posts){
      return null
    }

   const  Postrender=this.state.Posts.map(function(value){
      return (
//       <div className="col-md-12" style={{marginBottom:'5px'}}>
      
// <div className="card"> 
// <div className="card-body">
//   <h5 className="card-title">{value.title}</h5>
//   <hr/>
//   <p className="card-text">{value.description}
//   </p>
//   <hr/>
// <a href={value.link}>Go to whole Scenario</a>
// <hr/>
// <button onClick={()=>this.Postdel(value._id)}>Del</button>

// </div>
// </div>
//     </div>
<div>

  <li id={value._id}>{value.title} <button onClick={(e)=>{this.Postdel(e.target.id)
  console.log(value._id)
  }
}>Del</button></li>
</div>
      )
    })
  
    return (
      <div>
        <label htmlFor="title">Title:</label><input type="text" name="title" value={this.state.title} onChange={(e)=>this.TextBoxVal(e)}/>
       <br/>
       <label htmlFor="description">Description:</label><input type="text" name="description" value={this.state.description} onChange={(e)=>this.TextBoxVal(e)}/>
         <br/>
       <label htmlFor="link">Link:</label><input type="text" name="link" value={this.state.link} onChange={(e)=>this.TextBoxVal(e)}/>
       <button onClick={this.submitPost.bind(this)}>Submit</button>
       {Postrender}
      </div>
    )
  }
}
