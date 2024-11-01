<?php
/**
 * Plugin Name: TraveledMap Embedded Map
 * Plugin URI: https://wordpress.org/plugins/traveledmap-embeded-map
 * Description: Plugin that helps you setup a map of your travel's, using a TraveledMap.com map. Get the list of your trips and blog posts on a map in 5 minutes.
 * Author: traveledmap
 * Author URI: https://www.traveledmap.com
 * Version: 1.0.3
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package TraveledMap
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
