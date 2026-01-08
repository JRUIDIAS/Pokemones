// ==============================
// 🌍 TRADUCCIÓN DE TIPOS
// ==============================
const typeTranslations = {
	fire: "Fuego",
	water: "Agua",
	grass: "Planta",
	electric: "Eléctrico",
	ice: "Hielo",
	fighting: "Lucha",
	poison: "Veneno",
	ground: "Tierra",
	flying: "Volador",
	psychic: "Psíquico",
	bug: "Bicho",
	rock: "Roca",
	ghost: "Fantasma",
	dark: "Siniestro",
	dragon: "Dragón",
	steel: "Acero",
	fairy: "Hada",
	normal: "Normal"
};

// ==============================
// 🔎 OBTENER ID DESDE LA URL
// ==============================
const params = new URLSearchParams(window.location.search);
const pokemonId = params.get('id');

if (!pokemonId) {
	alert('No se encontró el Pokémon');
	window.location.href = 'index.html';
}

// ==============================
// 🧩 ELEMENTOS DEL DOM
// ==============================
const pokemonName = document.getElementById('pokemon-name');
const pokemonNumber = document.getElementById('pokemon-number');
const pokemonImg = document.getElementById('pokemon-img');
const pokemonTypes = document.getElementById('pokemon-types');
const pokemonHeight = document.getElementById('pokemon-height');
const pokemonWeight = document.getElementById('pokemon-weight');

// Stats
const statBars = document.querySelectorAll('.progress-bar');
const statCounters = document.querySelectorAll('.counter-stat');

// ==============================
// 🌐 LLAMADA A LA API
// ==============================
async function loadPokemon() {
	try {
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${pokemonId}`
		);

		if (!response.ok) throw new Error('Pokémon no encontrado');

		const data = await response.json();
		renderPokemon(data);

	} catch (error) {
		console.error(error);
		alert('Error al cargar el Pokémon');
	}
}

// ==============================
// 🎨 RENDERIZAR DATOS
// ==============================
function renderPokemon(data) {

	// Nombre y número
	pokemonName.textContent =
		data.name.charAt(0).toUpperCase() + data.name.slice(1);
	pokemonNumber.textContent = `#${data.id}`;

	// Imagen oficial
	pokemonImg.src =
		data.sprites.other['official-artwork'].front_default;

	// Altura y peso
	pokemonHeight.textContent = data.height / 10 + ' m';
	pokemonWeight.textContent = data.weight / 10 + ' kg';

	// Tipos (traducidos pero con clases en inglés)
	pokemonTypes.innerHTML = '';
	data.types.forEach(type => {
		const typeName = type.type.name;
		const span = document.createElement('span');

		span.textContent = typeTranslations[typeName] || typeName;
		span.classList.add(typeName);

		pokemonTypes.appendChild(span);
	});

	// Stats
	data.stats.forEach((stat, index) => {
		if (statCounters[index] && statBars[index]) {
			statCounters[index].textContent = stat.base_stat;
            statBars[index].style.setProperty(
                'width', 
                stat.base_stat + '%'
            );
		}
	});
}

// ==============================
// 🚀 INICIAR
// ==============================
loadPokemon();
