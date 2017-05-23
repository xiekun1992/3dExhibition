define('controlsGUI', [], function(){
	function controlsGUI(controls, controlsFn){
		function applySettings(name, value){
			// controlsFn({fn: name, param: value});
			controlsFn[name].call(null, value);
		}
		var gui = new dat.GUI();
		gui.add(controls, 'enableShadow').onChange(function(){
			applySettings('changeShadow', controls.enableShadow);
		});
		gui.add(controls, 'ambientLight').onChange(function(){
			applySettings('changeAmLight', controls.ambientLight);
		});
		
		var spotLightGUI = gui.addFolder('spotLight');
		spotLightGUI.add(controls, 'spotLightEnable').onChange(function(){
			applySettings('changeSpotLight', controls.spotLightEnable);
		});
		spotLightGUI.add(controls, 'spotLightX', -30, 30).onChange(function(){
			applySettings('changeSpotLightPosition', {x: controls.spotLightX});
		});
		spotLightGUI.add(controls, 'spotLightY', -30, 30).onChange(function(){
			applySettings('changeSpotLightPosition', {y: controls.spotLightY});
		});
		spotLightGUI.add(controls, 'spotLightZ', -30, 30).onChange(function(){
			applySettings('changeSpotLightPosition', {z: controls.spotLightZ});
		});

		var directionalLightGUI = gui.addFolder('directionalLight');
		directionalLightGUI.add(controls, 'directLightEnable').onChange(function(){
			applySettings('changeDirectLight', controls.directLightEnable);
		});
		directionalLightGUI.add(controls, 'directLightX', -30, 30).onChange(function(){
			applySettings('changeDirectLightPosition', {x: controls.directLightX});
		});
		directionalLightGUI.add(controls, 'directLightY', -30, 30).onChange(function(){
			applySettings('changeDirectLightPosition', {y: controls.directLightY});
		});
		directionalLightGUI.add(controls, 'directLightZ', -30, 30).onChange(function(){
			applySettings('changeDirectLightPosition', {z: controls.directLightZ});
		});
	};
	return controlsGUI;
});