<template>
    <div class="h-screen w-screen d-flex align-center justify-center">
         <div class="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
         </div>
    </div>
</template>

<style scoped>

.loading{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    gap:6px;
}

.loading span{
    width: 6px;
    height: 100px;
    background-color: #008080;
    border-radius: 2px;
    animation: scale 0.9s ease-in-out infinite;
}

.loading span:nth-child(2){
    background-color: #008;
    animation-delay: 0.8s;
}
.loading span:nth-child(3){
    background-color: #3242;
    animation-delay: 0.7s;
}
.loading span:nth-child(4){
    background-color: #786785;
    animation-delay: 0.6s;
}
.loading span:nth-child(5){
    background-color: #008;
    animation-delay: 0.5s;
}

</style>