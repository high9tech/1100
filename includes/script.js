// تسجيل Service Worker للعمل أوفلاين
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((reg) => {
                console.log('HIGH TECH PS Service Worker Registered:', reg.scope);
            })
            .catch((err) => {
                console.log('HIGH TECH PS Service Worker Registration Failed:', err);
            });
    });
}

// متابعة أحداث Application Cache وحساب النسبة من 1% إلى 100%
if (window.applicationCache) {
    var appCache = window.applicationCache;

    appCache.addEventListener('checking', function() {
        document.getElementById('cache-status').innerHTML = "جاري التحقق من الملفات...";
    }, false);

    appCache.addEventListener('downloading', function() {
        document.getElementById('cache-status').innerHTML = "جاري تحضير الكاش: 1%";
    }, false);

    appCache.addEventListener('progress', function(e) {
        if (e.lengthComputable) {
            var percentage = Math.round((e.loaded / e.total) * 100);
            document.getElementById('cache-status').innerHTML = "جاري تحميل الكاش: " + percentage + "%";
        }
    }, false);

    appCache.addEventListener('cached', function() {
        document.getElementById('cache-status').innerHTML = "successful cache - جاهز للعمل بدون إنترنت!";
    }, false);

    appCache.addEventListener('noupdate', function() {
        document.getElementById('cache-status').innerHTML = "successful cache - تم حفظ الملفات أوفلاين من قبل";
    }, false);

    appCache.addEventListener('error', function() {
        document.getElementById('cache-status').innerHTML = "successful cache";
    }, false);
}

// تشغيل الثغرة عند الضغط على الختم
function runGoldHen() {
    document.getElementById('cache-status').innerHTML = "جاري تشغيل الثغرة (GoldHEN PSfree)...";
    var script = document.createElement('script');
    script.src = "src/main.js";
    document.body.appendChild(script);
}
