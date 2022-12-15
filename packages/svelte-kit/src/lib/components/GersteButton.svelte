<script  lang="ts">
</script>


<button class="button" on:click
    ><slot></slot>
</button>



<style>
    button{
        min-width: 10em;
        width: 10vw;
        font-family: gersteWeinFont;
        font-size: 18pt;
        transition: width 1s, box-shadow 0.5s;
        -webkit-box-shadow:0px 0px 80px 0px rgba(255, 46, 238, 0);
        -moz-box-shadow: 0px 0px 120px 0px rgba(196, 46, 255, 0);
        box-shadow: 0px 0px 0px 0px rgba(46, 255, 227, 0.75);
        
    }

    button:hover{
        width: 25vw;
        -webkit-box-shadow:0px 0px 80px 5px rgba(46,157,255,0.35);
        -moz-box-shadow: 0px 0px 80px 5px rgba(46,157,255,0.35);
        box-shadow: 0px 0px 120px 10px rgba(46,157,255,0.35);
        cursor: pointer;
    }

</style>