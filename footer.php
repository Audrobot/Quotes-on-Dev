<?php
/**
 * The template for displaying the footer.
 *
 * @package QOD_Starter_Theme
 */
?>
			</div><!-- #content -->

			<footer id="colophon" class="site-footer" role="contentinfo">
				<div class="site-info">

					<?php 
					wp_nav_menu(
							array (
									'theme_location' => 'primary',
									'menu_id' => 'primary_menu',
									'menu_class' => 'footer_navigation'
							)
					);
					?>

					<p>Brought to you by <a href="https://github.com/Audrobot">
					Audra Kornicki</a> © <?php echo date('Y'); ?></p>

				</div><!-- .site-info -->
			</footer><!-- #colophon -->
		</div><!-- #page -->

		<?php wp_footer(); ?>

	</body>
</html>
