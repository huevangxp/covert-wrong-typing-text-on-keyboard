<template>
    <div class="h-screen w-screen d-flex align-center justify-center bg-white">
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </template>
  
  <style scoped>
  .loading {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 120px;
    height: 100px;
    gap: 8px;
  }
  
  /* Base animation */
  .loading span {
    width: 8px;
    height: 120px;
    background-color: #008080; /* main teal */
    border-radius: 4px;
    animation: scale 1.5s ease-in-out infinite;
  }
  
  /* Beautiful color gradient */
  .loading span:nth-child(1) { background-color: #007a74; animation-delay: 0s; }
  .loading span:nth-child(2) { background-color: #009688; animation-delay: 0.1s; }
  .loading span:nth-child(3) { background-color: #00b3a4; animation-delay: 0.2s; }
  .loading span:nth-child(4) { background-color: #4dd0c5; animation-delay: 0.3s; }
  .loading span:nth-child(5) { background-color: #80ece4; animation-delay: 0.4s; }
  .loading span:nth-child(6) { background-color: #007a74; animation-delay: 0.5s; }
  .loading span:nth-child(7) { background-color: #009688; animation-delay: 0.6s; }
  .loading span:nth-child(8) { background-color: #00b3a4; animation-delay: 0.7s; }
  
  /* Smooth scale effect */
  @keyframes scale {
    0%, 40%, 100% {
      transform: scaleY(0.2);
    }
    20% {
      transform: scaleY(1);
    }
  }
  </style>
  