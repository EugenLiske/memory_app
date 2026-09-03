 export function renderHomeScreen(){
    let screenContainer = document.getElementById('screen-content') as HTMLElement;

    screenContainer.innerHTML = getHomeTemplate();
 }
 
 export function getHomeTemplate(){
    return  `
        <main class="home-screen">
            <div class="home-screen__heading">
                <h2 class="home-screen__subtitle">
                    It's play time.
                </h2>

                <h1 class="home-screen__title">
                    Ready to play?
                </h1>
            </div>

            <button class="action-button action-button--homescreen">
                <img class="action-button__controller" src="/assets/homescreen/button_controller.svg" alt="">

                <span class="action-button__label">Play</span>

                <span class="action-button__arrow-wrapper">
                    <img
                        class="action-button__arrow action-button__arrow--default"
                        src="/assets/homescreen/button_arrow.svg"
                        alt=""
                    >

                    <img
                        class="action-button__arrow action-button__arrow--hover"
                        src="/assets/homescreen/button_arrow_hover.svg"
                        alt=""
                    >
                </span>
            </button>

            <img
                class="home-screen__decorative-controller"
                src="/assets/homescreen/tilted_controller.svg"
                alt=""
            >
        </main>
   `;
}