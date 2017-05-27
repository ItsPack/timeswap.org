var center = {lat: 45, lng: -122};
var sliderpos = -95;
var isOpen = false;
function openNav() {
	document.getElementById("mySidenav").style.width = "100%";
	setTimeout(function() {$(".sidenavslide2").show();}, 170);
}
function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	setTimeout(function() {$(".sidenavslide2").hide();}, 170);
}
function toggleSearchNav() {
	if (isOpen == true) {
		closeSearchNav();
	} else {
		openSearchNav();
	}
}
function openSearchNav() {
	$(".sidenavslide").hide();
	sliderpos = 405;
	var slider = $("#searchNavSlider a");
	slider.animate({right: '400px'}, 1);
	document.getElementById("searchNav").style.width = "500px";
	$(".fa-angle-double-left").addClass("fa-angle-double-right");
	$(".fa-angle-double-left").removeClass("fa-angle-double-left");
	isOpen = true;
	$(".sidenavslide").hide();
	setTimeout(function() {$(".sidenavslide").show();}, 170);
}

function closeSearchNav() {
	sliderpos = -95;
	var slider = $("#searchNavSlider a");
	slider.animate({right: '-100px'}, 1);
	document.getElementById("searchNav").style.width = "0";
	$(".fa-angle-double-right").addClass("fa-angle-double-left");
	$(".fa-angle-double-right").removeClass("fa-angle-double-right");
	isOpen = false;
	setTimeout(function() {$(".sidenavslide").hide();}, 120);
}
function initAutocomplete() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: center,
		zoom: 13,
		mapTypeId: 'roadmap'
	});

	// Create the search box and link it to the UI element.
	var input = document.getElementById('pac-input');
	var input2 = document.getElementById('pac-input2');
	var searchBox = new google.maps.places.SearchBox(input);
	var searchBox2 = new google.maps.places.SearchBox(input2);

	// Bias the SearchBox results towards current map's viewport.
	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
		searchBox2.setBounds(map.getBounds());
	});

	var markers = [];
	// Listen for the event fired when the user selects a prediction and retrieve
	// more details for that place.
	searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();

		if (places.length == 0) {
			return;
		}

		// Clear out the old markers.
		markers.forEach(function(marker) {
			marker.setMap(null);
		});
		markers = [];

		// For each place, get the icon, name and location.
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place) {
			if (!place.geometry) {
				console.log("Returned place contains no geometry");
				return;
			}
			var icon = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			};

			if (place.geometry.viewport) {
				// Only geocodes have viewport.
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
		map.fitBounds(bounds);
	});
	searchBox2.addListener('places_changed', function() {
		var places = searchBox2.getPlaces();

		if (places.length == 0) {
			return;
		}

		// Clear out the old markers.
		markers.forEach(function(marker) {
			marker.setMap(null);
		});
		markers = [];

		// For each place, get the icon, name and location.
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place) {
			if (!place.geometry) {
				console.log("Returned place contains no geometry");
				return;
			}
			var icon = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			};
			
			//Runs when user searches something
			$(".popUp").hide();
			
			if (place.geometry.viewport) {
				// Only geocodes have viewport.
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
		map.fitBounds(bounds);
	});
	$(document).ready(function(){
		$(".signup").hide();
		$("#logInClick").click(function() {
			$(".login").hide();
			$(".signup").show();
		});
		$("#signUpClick").click(function() {
			$(".login").show();
			$(".signup").hide();
		});
		$(".close").click(function() {
			closeNav();
		});
		$("#searchNavSlider").click(function() {
			toggleSearchNav();
		});
		$("#searchNavSlider").mouseenter(function() {
			if (sliderpos == -95) {
				var slider = $("#searchNavSlider a");
				slider.animate({right: '-30px'}, 1);
				sliderpos = -30;
			} else if (sliderpos == 405) {
				var slider = $("#searchNavSlider a");
				slider.animate({right: '470px'}, 1);
				sliderpos = 470;
			}
		});
		$("#searchNavSlider").mouseleave(function() {
			if (sliderpos == -30) {
				var slider = $("#searchNavSlider a");
				slider.animate({right: '-100px'}, 1);
				sliderpos = -95;
			} else if (sliderpos == 470) {
				var slider = $("#searchNavSlider a");
				slider.animate({right: '400px'}, 1);
				sliderpos = 405;
			}
		});
		$("#submit").click(function() {
			if (!$('input[name="title"]').val() == "" && !$('textarea[name="desc"]').val() == "" && !$('input[name="date"]').val() == "" && !$('input[name="time"]').val() == "") {
				var marker = new google.maps.Marker({
					position: map.getCenter(),
					map: map,
					title: $('input[name="title"]').val()
				});
				var contentString = '<div id="content">'+
					 '<div id="siteNotice">'+
					 '</div>'+
					 '<h1 id="firstHeading" class="firstHeading">' + $('input[name="title"]').val() + '</h1>' +
					 '<h3>' + $('input[name="time"]').val() + ' EST Time, on ' + $('input[name="date"]').val() + '</h3>' +
					 '<div id="bodyContent">'+
					 '<p>' + $('textarea[name="desc"]').val() + '</p>'+
					 '</div>'+
					 '</div>';

				var infowindow = new google.maps.InfoWindow({
					content: contentString
				});
				marker.addListener('click', function() {
					infowindow.open(map, marker);
				});
			}
		});
	});
}
closeNav();