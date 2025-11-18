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
    width: 12px;
    height: 12px;
    background-color: #008080;
    border-radius: 50%;
    animation: loading 1s ease-in-out infinite;
}

</style>