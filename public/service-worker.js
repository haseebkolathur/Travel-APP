const CACHE_NAME = 'version-1'
const urlsToCache = ['index.html', 'offline.html'];

// Install SW

self.addEventListener('install', (event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) =>{
                console.log('Opened cache ');

                return cache.addAll(urlsToCache);
            })
    ) 
})

// Listen for requests

self.addEventListener("fetch", (event)=> {
    event.respondWith(
        caches.match(event.request)
            .then(()=>{
                return fetch(event.request)
                    .catch(()=>caches.match('offline.html'))
            })
    )
})

//active the sw

self.addEventListener("active",(event) =>{
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        chaches.keys().then((cacheNames )=> Promise.all(
            cacheNames.map((cacheNames)=> {
                if(!cacheWhiteList.includes(cacheNames)){
                    return caches.delete(cacheNames)
                }
            })
        ))
    )
})