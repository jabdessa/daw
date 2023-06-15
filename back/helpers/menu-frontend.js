const getMenuFrontEnd = (role = 'JUEZ') => {
    if (role === 'ADMIN') {
        return [{
            titulo: 'Mantenimiento',
            icono: 'fas fa-tools',
            submenu: [
                { titulo: 'Jueces', url: 'jueces' }
            ]
        }];
    }
    // JUEZ + SEC (resto de roles)
    else {
        return [{
            titulo: 'Calendario',
            icono: 'far fa-calendar-alt',
            submenu: [
                { titulo: 'Competiciones', icono: 'fas fa-running fa-lg', url: '/' },
            ]
        }];
    }
}

module.exports = {
    getMenuFrontEnd
}