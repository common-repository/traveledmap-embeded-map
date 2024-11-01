import './style.scss';
import './editor.scss';

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
import {TextControl, Button, ToggleControl} from '@wordpress/components';

const renderContent = (props) => {
	const {attributes: {mapUrl, showTraveledMapLink}} = props;

	return (
		<div className="d-flex flex-center flex-column">
			<iframe className="map-iframe" src={mapUrl} frameBorder="0" allow="fullscreen"/>
			{
				showTraveledMapLink && (
					<p>
						<small>
							<a href="https://www.traveledmap.com" target="_blank">Created on TraveledMap</a>
						</small>
					</p>
				)
			}
		</div>
	);
};

registerBlockType('traveledmap/embedded-map-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Embedded Map'), // Block title.
	icon: 'location-alt', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('Embedded Map'),
		__('TraveledMap'),
		__('Traveled Map'),
		__('Embedded'),
		__('Embed'),
	],
	attributes: {
		showTraveledMapLink: {
			type: 'boolean',
			default: true,
		},
		mapUrl: {
			type: 'string',
		},
		mapUrlInputVal: {
			type: 'string',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function (props) {
		const {attributes: {mapUrl, mapUrlInputVal, showTraveledMapLink}, setAttributes, className} = props;
		const onMapLinkChange = (newMapUrl) => {
			setAttributes({mapUrlInputVal: newMapUrl});
		};
		const setMapLink = () => {
			setAttributes({mapUrl: mapUrlInputVal});
		};

		return (
			<div>
				<p>
					To get the link of your Map, go to the <a href="https://www.traveledmap.com/embed" target="_blank">Embed page</a>&nbsp;
					and follow the instructions.
				</p>
				<div className="input-with-button">
					<TextControl
						label="Link of your TraveledMap"
						value={mapUrlInputVal}
						onChange={onMapLinkChange}
					/>
					<Button isPrimary onClick={setMapLink}>
						Validate
					</Button>
				</div>
				{
					mapUrl && (
						renderContent(props)
					)
				}

				<ToggleControl
					label="Show TraveledMap link"
					className="mt-10"
					checked={showTraveledMapLink}
					onChange={() => setAttributes({ showTraveledMapLink: !showTraveledMapLink })}
				/>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function (props) {
		return renderContent(props);
	},
});
