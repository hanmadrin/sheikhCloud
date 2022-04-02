const changeFavicon = (iconUrl) => {
    //changes the favicon of the browser
    try {
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = iconUrl;
        document.getElementsByTagName('head')[0].appendChild(link);
    } catch (error) {
        console.log(error);
    }
}

const changeTitle = (title) => {
    //changes the title of the browser
    try {
        document.title = title;
    } catch (error) {
        console.log(error);
    }
}
const generateLoader = () => {
    // generates the loader
    try{
        if(document.getElementById('neoLoader')===null){
            const neoLoader = document.createElement('div');
            neoLoader.id = 'neoLoader';
            neoLoader.style.display = 'none';
            const loaderHolder = document.createElement('div');
            loaderHolder.className = 'loader-holder';
            const loader = document.createElement('div');
            loader.className = 'loader';
            loaderHolder.appendChild(loader);
            neoLoader.appendChild(loaderHolder);
            document.body.appendChild(neoLoader);
        }
    }catch(error){
        console.log(error);
    }
}
const showHideLoader = (show) => {
    //shows or hides the loader
    try {
        const neoLoader = document.getElementById('neoLoader');
        if (show) {
            neoLoader.style.display = 'block';
        } else {
            neoLoader.style.display = 'none';
        }
    } catch (error) {
        console.log(error);
    }
}
const sleep = async (ms) => {
    //sleeps for a given time
    return new Promise(resolve => setTimeout(resolve, ms));
}
export {changeFavicon,changeTitle,showHideLoader,generateLoader,sleep};