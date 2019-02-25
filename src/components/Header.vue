<template>
  <div class="main-container">
    <header>
      <p>IPL DATA VISUALIZATION</p>
      <nav>
        <span id="menu-icon"></span>
        <ul>
          <li><router-link :class="{ 'current': current == 0, 'nav-options': true}" to="/">Teams</router-link></li>
          <li><router-link :class="{ 'current': current == 1, 'nav-options': true}" to="/player">Players</router-link></li>
          <li><router-link :class="{ 'current': current == 2, 'nav-options': true}" to="/venue">Venues</router-link></li>
          <li><router-link :class="{ 'current': current == 3, 'nav-options': true}" to="/season">Seasons</router-link></li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  watch:{
    $route (to){
      this.current = this.getCurrent(to.name);
    }
  },
  data() {
    return {
      current: this.getCurrent(this.$route.name)
    }
  },
  methods: {
    getCurrent(name) {
      switch (name) {
        case 'Team': return 0;
        case 'Player': return 1;
        case 'Venue': return 2;
        case 'Season': return 3;
      }
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  .main-container {
    padding: 0px;
  }
  .nav-options {
    color: rgb(156, 155, 155);
    font-size: 18px;
  }
  .nav-options:hover {
	  color: rgb(199, 197, 197);
  }

  header {
    background: rgb(5, 5, 5);
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: inline-block
  }

  nav {
    float: left;
  }

  #menu-icon {
    display: hidden;
    width: 40px;
    height: 40px;
    background: rgb(0, 0, 0) url(../assets/menu-icon.png);
  }

  a:hover#menu-icon {
    background-color: rgb(180, 178, 178);
    border-radius: 4px 4px 0 0;
  }

  li {
    display: block;
    float: left;
    padding: 10px
  }

  .current {
    color: rgb(221, 223, 223);
  }

  p {
    color: white;
    font-size: 20px;
    margin: 20px;
    float: left;
    height: 40px;
    display: block;
  }

  /* media query for mobiles */
  @media only screen and (max-width : 640px) {
    header {
      position: absolute;
      width: 100%
    }

    #menu-icon {
      display:inline-block;
    }

    nav ul, nav:active ul { 
      display: none;
      position: absolute;
      padding: 20px;
      background: rgb(51, 51, 51);
      border: 5px solid #444;
      right: 20px;
      top: 60px;
      width: 50%;
      border-radius: 4px 0 4px 4px;
    }

    nav li {
      text-align: center;
      width: 100%;
      padding: 10px 0;
      margin: 0;
    }

    nav:hover ul {
      display: block;
    }
  }
</style>

