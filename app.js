if ('Notification' in window && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/TugasPAW_AppPWA/sw.js').then(registration => {
        console.log('Service Worker registered:', registration);

        // Meminta izin notifikasi
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                // Menambahkan event listener untuk tombol
                document.getElementById('notifyBtn').addEventListener('click', () => {
                    // Menampilkan notifikasi saat tombol diklik
                    registration.showNotification('Welcome to My PWA!', {
                        body: 'Click here to learn more about this app.',
                        icon: '/TugasPAW_AppPWA/images/icons/new-icon-192x192.png',
                        tag: 'welcome-notification',
                        actions: [
                            { action: 'about', title: 'About App', icon: '/TugasPAW_AppPWA/images/icons/new-icon-512x512.png' }
                        ]
                    });
                });
            } else {
                console.warn('Notification permission denied.');
            }
        }).catch(error => {
            console.error('Error requesting notification permission:', error);
        });
    }).catch(err => {
        console.error('Service Worker registration failed:', err);
    });
}
