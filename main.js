// ====== MOSTRAR / OCULTAR PANEL DE FILTROS ======
const btnFilter = document.querySelector('.icon-filter');
const containerFilter = document.querySelector('.container-filters');

const btnCloseFilters = document.querySelector('.btn-close-filters');

btnCloseFilters.addEventListener('click', () => {
	containerFilter.classList.remove('active');
	searchByName();
});


btnFilter.addEventListener('click', () => {
	containerFilter.classList.toggle('active');
});

// ====== ELEMENTOS ======
const checkboxes = document.querySelectorAll(
	'.filter-by-type input[type="checkbox"]'
);
const cards = document.querySelectorAll('.card-pokemon');
const searchInput = document.querySelector('input[type="search"]');
const searchForm = document.querySelector('form');

// ====== FILTRAR POR TIPO ======
checkboxes.forEach(checkbox => {
	checkbox.addEventListener('change', filterPokemon);
});

function filterPokemon() {
	const activeTypes = Array.from(checkboxes)
		.filter(cb => cb.checked)
		.map(cb => cb.id);

	cards.forEach(card => {
		const types = card.querySelectorAll('.card-types span');
		const pokemonTypes = Array.from(types).map(t =>
			t.className.toLowerCase()
		);

		const match =
			activeTypes.length === 0 ||
			activeTypes.some(type => pokemonTypes.includes(type));

		card.style.display = match ? 'block' : 'none';
	});
}

// ====== BUSCAR POR NOMBRE ======
searchForm.addEventListener('submit', e => {
	e.preventDefault();
	searchByName();
});

function searchByName() {
	const value = searchInput.value.toLowerCase().trim();

	cards.forEach(card => {
		const name = card.querySelector('h3').textContent.toLowerCase();

		// Verificamos si pasa el filtro de tipo
		const types = card.querySelectorAll('.card-types span');
		const pokemonTypes = Array.from(types).map(t =>
			t.className.toLowerCase()
		);

		const activeTypes = Array.from(checkboxes)
			.filter(cb => cb.checked)
			.map(cb => cb.id);

		const matchType =
			activeTypes.length === 0 ||
			activeTypes.some(type => pokemonTypes.includes(type));

		const matchName = name.includes(value);

		card.style.display = matchName && matchType ? 'block' : 'none';
	});
}
