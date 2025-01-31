import { API_URL } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		playerCount: await fetch(`${API_URL}/player`).then(res => res.json()).then(p => p.length),
		questCount: await fetch(`${API_URL}/quest`).then(res => res.json()).then(q => q.length),
		dungeonCount: await fetch(`${API_URL}/dungeon`).then(res => res.json()).then(d => d.length)
	};
}