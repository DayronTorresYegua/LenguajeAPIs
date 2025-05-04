document.addEventListener('DOMContentLoaded', () => {
    const resultadoDiv = document.getElementById('resultado');

    function pedirPokemon() {
        const nombrePokemon = prompt('Introduce el nombre del Pokémon:');
        if (!nombrePokemon) {
            resultadoDiv.textContent = 'Has cancelado la búsqueda.';
            return;
        }

        const nombreNormalizado = nombrePokemon.trim().toLowerCase();

        fetch(`https://pokeapi.co/api/v2/pokemon/${nombreNormalizado}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon no encontrado');
                }
                return response.json();
            })
            .then(data => {
                const nombre = data.name;
                const altura = data.height;
                const peso = data.weight;
                const tipos = data.types.map(t => t.type.name).join(', ');
                const imagen = data.sprites.front_default;

                resultadoDiv.innerHTML = `
                    Nombre: ${nombre}<br>
                    Altura: ${altura}<br>
                    Peso: ${peso}<br>
                    Tipos: ${tipos}<br>
                    <img src="${imagen}" alt="Imagen de ${nombre}">
                `;
            })
            .catch(error => {
                alert('Error: ' + error.message);
                pedirPokemon();
            });
    }
    pedirPokemon();
});