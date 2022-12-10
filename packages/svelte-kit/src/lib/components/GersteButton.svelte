<script  lang="ts">
    export let color:any;
</script>


<button class="button" on:click
    ><slot></slot>
</button>



<style>
    button{
        width:15rem;
        font-family: gersteWeinFont;
        font-size: 18pt;
        transition: width 1.5s;
    }

    button:hover{
        width: 30rem;
    }

</style>