const getMenuFrontEnd = (role = 'JUEZ') => {
    // TODO revisar todo esto para los menus
    const menu = [{
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'Gráficas', url: 'grafica1' },
                { titulo: 'rxjs', url: 'rxjs' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'ProgressBar', url: 'progress' },
            ]
        },

        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Jueces', url: 'jueces' },
                { titulo: 'Hospitales', url: 'hospitales' },
                { titulo: 'Médicos', url: 'medicos' },
            ]
        },
    ];

    if (role === 'ADMIN') {
        menu[1].submenu.unshift({ titulo: 'Jueces', url: 'jueces' })
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}