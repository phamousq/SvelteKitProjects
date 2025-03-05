<script>
	import { LayerCake, Svg } from 'layercake';
	import { Button } from 'svelte-ux';

	import Line from '../_components/Line.svelte';
	import Area from '../_components/Area.svelte';
	import AxisX from '../_components/AxisX.svelte';
	import AxisY from '../_components/AxisY.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach((d) => {
		d[yKey] = +d[yKey];
	});

	let testData = [
		{ x: 1, y: 10 },
		{ x: 2, y: 20 }
	];
</script>

<main>
	<div class="chart-container">
		<LayerCake
			padding={{ top: 8, right: 10, bottom: 20, left: 25 }}
			x={xKey}
			y={yKey}
			yDomain={[0, null]}
			{data}
		>
			<Svg>
				<AxisX />
				<AxisY ticks={4} />
				<Line />
				<Area />
			</Svg>
		</LayerCake>
	</div>

	<Button class="uppercase" variant="outline" color="primary">outline</Button>
	<Button
		onclick={() => {
			console.log('clicked');
		}}>Click here</Button
	>
</main>

<style>
	/*
      The wrapper div needs to have an explicit width and height in CSS.
      It can also be a flexbox child or CSS grid element.
      The point being it needs dimensions since the <LayerCake> element will
      expand to fill it.
    */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
