<template>  
    <div class="container">
      <div class="jumbotron">
          <h1>A Demo!</h1>
          <p>Let's play a demo</p>
         <p><router-link to="/play" class="btn btn-primary btn-lg">play</router-link></p>
      </div> 
    </div>
    <router-view></router-view>
</template>  
<script>  
export default{  
    name:'app'
}  
</script>