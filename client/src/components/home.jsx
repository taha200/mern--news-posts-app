import React, { Component } from 'react'
import ReactModal from 'react-modal';
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state= {
            title:'',
            description:'',
            link:'',
            Posts:[],
            showModal:false,
            updId:''
        }
  //       fetch('http://localhost:8000').then(res=>res.json()).then(data=>{
  //   const Postsfetch = data
  // this.setState({
  //   Posts:Postsfetch
  // })
  // console.log(this.state.Posts)
  // })
        this.Postdel=this.Postdel.bind(this);
        // this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.Postupd=this.Postupd.bind(this)
    }
    
    TextBoxVal(e){
        this.setState({
            [e.target.name]:e.target.value
        })
  
}
 componentDidMount(){
fetch('http://localhost:8000').then(res=>res.json()).then(data=>{
    const Postsfetch = data
  this.setState({
    Posts:Postsfetch
  })
  console.log(this.state.Posts)
  })
}
handleOpenModal (e,val) {
 let id=e.target.id
 console.log(id)
 console.log(val)
  this.setState({ showModal: true,updId:id,title:val.title,description:val.description,link:val.link });
}

handleCloseModal () {
  this.setState({ showModal: false,  title:'',
  description:'',
  link:'', });
}    
 async  submitPost(e){
  e.preventDefault()
  const userPost=this.state
await fetch('/users',{
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
    async Postdel(e){
      let id = e.target.id
      console.log(id)
      await fetch('/users/remove/'+id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }).then(res=>res.json()).then(data=>{
          if(data){
            let newPosts = this.state.Posts.filter((post)=>{
              return post._id!==id
            })
            this.setState({
              Posts:newPosts
            })
          }
        }).catch(err=>console.error(err));
  }
 async  Postupd(e){
  let id=e.target.id
  console.log(id)
const userPost=this.state
await fetch('/users/update/'+id, {
     method: 'PUT',
    headers: {
      'Accept': 'application/json',
       'Content-Type': 'application/json'
    },
    body:JSON.stringify(userPost)
  }).then(res=>res.json()).then(data=>{
    if(data){
       console.log(data)
       this.setState({
        title:'',
        description:'',
        link:''
    })
     }
   }).catch(err=>console.error(err));
          fetch('http://localhost:8000').then(res=>res.json()).then(data=>{
    const Postsfetch = data
  this.setState({
    Posts:Postsfetch
  })
  console.log(this.state.Posts)
  })
}
  render() {
  
    return (
      <div>
        <label htmlFor="title">Title:</label><input type="text" style={{width:'500px'}} name="title" value={this.state.title} onChange={(e)=>this.TextBoxVal(e)}/>
       <br/>
       <label for="form7">Description</label>
       <textarea type="text" onChange={(e)=>this.TextBoxVal(e)} name="description" value={this.state.description} class="md-textarea form-control" rows="3"></textarea>
 
         <br/>
       <label htmlFor="link">Link:</label><input type="text" style={{width:'500px'}} name="link" value={this.state.link} onChange={(e)=>this.TextBoxVal(e)}/>
       <button onClick={this.submitPost.bind(this)}>Submit</button>
       {this.state.Posts.length>0 && this.state.Posts.map((value)=>{
     return       <div className="col-md-12" style={{marginBottom:'5px'}}>
      
     <div className="card"> 
      <div className="card-body">
        <h5 className="card-title">{value.title}</h5>
        <hr/>
        <p className="card-text">{value.description}
        </p>
        <hr/>
      <a  href={value.link} target="_blank">Go to whole Scenario</a>
      <hr/>
      <button id={value._id} onClick={this.Postdel}>Del</button>
      <button id={value._id} onClick={(e)=>this.handleOpenModal(e,value)}>Trigger Modal</button>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
          <div className="container">
          <div className="jumbotron">
          <label htmlFor="title">Title:</label><input type="text" style={{width:'500px'}} name="title" value={this.state.title} onChange={(e)=>this.TextBoxVal(e)} />
       <br/>
       <label for="form7">Description</label>
       <textarea type="text" onChange={(e)=>this.TextBoxVal(e)} name="description" value={this.state.description} class="md-textarea form-control" rows="3"></textarea>
          <br/>
       <label htmlFor="link">Link:</label><input type="text" style={{width:'500px'}} name="link" value={this.state.link} onChange={(e)=>this.TextBoxVal(e)}/>
       <button id={this.state.updId} onClick={this.Postupd}>Update</button>
          </div>
          </div>
        </ReactModal>
      </div>
      </div>
          </div>
     //    return <div>
      //    <li>{value.title} <button id={value._id} onClick={this.Postdel}>Del</button></li>
      //  </div>
       })}
      </div>
    )
  }
}
