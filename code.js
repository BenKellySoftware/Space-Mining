var MaterialsTimer = 0;
var FuelTimer = 0;
var ResetCount = false;
var Stat;

var Unlock;

var Resources;

var Item;

$(document).ready(function() {
	$("#Holder").scroll(function() {
		var position = -($("#Holder").scrollLeft()/10) + 'px '+ -($("#Holder").scrollTop()/10) + 'px';
		$("#Background").css({ "background-position": position});
	});
	Start();
});

function Start() {
	//Load initial Data
		Resources = {
			Cash: 0,
			FuelCells: 8,
			Carbonite: 0,
			Ironide: 0,
			Alumanon: 0,
			Stearite: 0,
			Crysite: 0
		};
		Unlock = {
			//Menus
			Intro: false,
			MaterialsMenu: false,
			Market: false,
			Deployment: false,
			//Elements
			Ironide: false,
			Alumanon: false,
			//Items
			SurfaceSweeper: false,	
			Drone: false,
			Drillbot: false,
			Filter: false,
			Crystaliser: false,
			Refinery: false,
			MoltenLaser: false,
			Cabins: false,
			RockBreaker: false,
			PreCharger: false
		};
		Item = {
			//Laser
			RockBreaker: false,
			Refractor: false,
			PreCharger: false,
			//Surface Sweeper
			SurfaceSweeper: [0,0],
			Filter: false,
			//Drone
			Drone: [0,0],
			MoltenLaser: false,
			//Drillbot
			Drillbot: [0,0],
			CrysiteCore : false,
			//Crew
			Cabin: [0,0],
			Crew: [0,0],
			//Jobs
			Recycler: 0,
			Refinery: false,
			Refiner: 0,
			Crystaliser: false,
			Compressor: 0
		};
		Stat = {
			Level: [1, 0, 100],
			TimesMined: 0,
			MaterialsSold: 0,
			CashMade: 0,
			FuelUsed: 0
		};
	
	//Reload Data
		if ($.cookie("Resources") != undefined) {
			Resources = JSON.parse($.cookie("Resources"));
		}	
		if ($.cookie("Item") != undefined) {
			Item = JSON.parse($.cookie("Item"));
		}
		if ($.cookie("Unlock") != undefined) {
			Unlock = JSON.parse($.cookie("Unlock"));
		}
		if ($.cookie("Stat") != undefined) {
			Stat = JSON.parse($.cookie("Stat"));
		}

	//Position and Text
		ResetCount = false;
		Text();
		$(Holder).scrollLeft(525);
		$(Holder).scrollTop(800);
		Sidebar("Notifications");
		$("#Menu").hide();
		$("#Update").hide();
	//Unlock Checks
		if (!Item.RockBreaker) {
			$("#ItemRockBreaker").hide();
			//Rock Breaker
		}
		else {
			$("#RockBreaker").parent().hide();
		}
		if (!Item.Filter) {
			$("#SurfaceWorth").text("Carbonite+3, Fuel-1");
			$("#ItemFilter").hide();
		}
		else {
			$("#SurfaceWorth").text("Carbonite+5 Fuel-1");
			$("#Filter").parent().hide();
		}
		if (!Item.MoltenLaser) {
			$("#DroneWorth").text("Ironide+3, Fuel-2");
			$("#ItemMoltenLaser").hide();
		}
		else {
			$("#DroneWorth").text("Ironide+5 Fuel-2");
			$("#MoltenLaser").parent().hide();
		}
		if (Item.Drone[1] == 0) {
			$("#ItemDrone").parent().hide();
		}
		if (Item.Drillbot[1] == 0) {
			$("#ItemDrillbot").parent().hide();
		}
		if (!Unlock.Intro) {
			$('#Spaceship').css({ "left": '1550px'});
			$('#Spaceship').animate({ "left": '750px'}, 8500);
			$('#Collect-Materials').hide();
			$('#Resources').hide();
			Notify("<p class = 'list'>Welcome to the mining vessel Gamma 1.03...</p>");
			setTimeout (function(){
				Notify("<p class = 'list'>You have been stationed on a secluded asteroid</p>");
				setTimeout (function(){
					Notify("<p class = 'list'>orbiting Alpha Centauri, to start, get some ores</p>");
					setTimeout (function(){
						Notify("<p class = 'list'>and sell them to the resource commision for</p>");
						setTimeout (function(){
						Notify("<p class = 'list'>profit, there is not much here, but it's a start.</p>");
							setTimeout (function(){
							Notify("<p class = 'list'>Good luck.</p>");
							$('#Collect-Materials').show();
							$('#Resources').show();
							Unlock.Intro = true;
							setTimeout (function(){Update();},3000);
							}, 2000);
						}, 1500);
					}, 1500);
				}, 1500);
			}, 1500);
		}
		else{
			setTimeout (function(){Update();},4000);
			//Start Updater
		}
		if(!Unlock.MaterialsMenu) {
			$("#MatHeading").hide();
			$("#Carbonite").parent().hide();
		}
		if (!Unlock.Ironide) {
			$("#Ironide").parent().hide();
		}
		if (!Unlock.Market) {
			$("#Market").children().children().hide();
			$("#FuelCells").hide();
			$("#Recycle-Fuel").hide();
		}
		if (!Unlock.RockBreaker) {
			$("#Upgrades").children("h1").hide();
			$("#RockBreaker").parent().hide();
		}
		if (!Unlock.Alumanon) {
			$("#Alumanon").parent().hide();
		}
		if (!Unlock.Deployment) {
			$("#DeployHeading").hide();
			$("#AutomationHeading").hide();
			$("#ItemSurfaceSweeper").parent().hide();
		}
		if (!Unlock.Filter) {
			$("#Filter").parent().hide();
		}
		if (!Unlock.MoltenLaser) {
			$("#MoltenLaser").parent().hide();
		}
		if (!Unlock.Drone) {
			$("#Drone").parent().hide();
		}
		if (!Unlock.Drillbot) {
			$("#Drillbot").parent().hide();
		}
		if (!Unlock.Cabins) {
			$("#Cabin").parent().hide();
		}
		if (Item.Cabin[1] == 0) {
			$("#ItemCrew").parent().hide();
			$("#AssigningHeading").hide();
			$("#JobFuelRecycler").parent().hide();
		}
		if (!Unlock.Crystaliser) {
			$("#Crystaliser").parent().hide();
		}
		if (!Unlock.Refinery) {
			$("#Refinery").parent().hide();
		}
		if (!Unlock.PreCharger) {
			$("#PreCharger").parent().hide();
		}
		if (Item.Crystaliser) {
			$("#Crystaliser").parent().hide();
		}
		else {
			$("#Crysite").parent().hide();
			$("#JobCompressor").parent().hide();
			$("#ItemCrystaliser").hide();
		}
		if (Item.Refinery) {
			$("#Refinery").parent().hide();
		}
		else {
			$("#Stearite").parent().hide();
			$("#JobRefiner").parent().hide();
			$("#ItemRefinery").hide();
		}
		if (Item.PreCharger) {
			$("#PreCharger").parent().hide();
		}
		else {
			$("#ItemPreCharger").hide();
		}

	//Set progress Bars
		$("#Recycle-Fuel").progressbar({
			value: FuelTimer,
			max: 225});
		$("#LevelBar").progressbar({
			value: Stat.Level[1],
			max: Stat.Level[2]});
		if (Item.PreCharger) {
			$("#Collect-Materials").progressbar({
			value: MaterialsTimer,
			max: 20});
		}
		else {
			$("#Collect-Materials").progressbar({
			value: MaterialsTimer,
			max: 40});
		}
	//Check for ad Block
		if ($('#Ad').height() == 0) {
			$("#Sidebar").height("100%");
		}
}

function Text() {
	//Crew Check
	if (Resources.Cash < Item.Crew[0]*3) {
		Item.Crew[0] = Math.floor(Resources.Cash/3);
	}
	if (Item.Crew[0] - Item.Refiner - Item.Compressor > 0) {
		Item.Recycler = Item.Crew[0] - Item.Refiner - Item.Compressor;
	}
	else {
		if(Item.Crew[0] - Item.Compressor > 0) {
			Item.Refiner = Item.Crew[0] - Item.Compressor;
		}
		else{
			Item.Refiner = 0;
			Item.Compressor = Item.Crew[0];
		}
	}
	$("#Cash").text("Cash: " + Resources.Cash);
	$("#FuelBuy").text(Resources.FuelCells);
	$("#FuelCells").text("Fuel Cells: " + Resources.FuelCells);
	
	$("#Carbonite").text(Resources.Carbonite);
	$("#Ironide").text(Resources.Ironide);
	$("#Alumanon").text(Resources.Alumanon);
	$("#Stearite").text(Resources.Stearite);
	$("#Crysite").text(Resources.Crysite);

	$("#SurfaceSweeper").text(Item.SurfaceSweeper[1]);
	$("#SurfaceSweeperPrice").text("$" + Math.ceil(100*Math.pow(1.2, Item.SurfaceSweeper[1])));
	$("#ItemSurfaceSweeper").text(Item.SurfaceSweeper[0] + "/" + Item.SurfaceSweeper[1]);

	$("#Drone").text(Item.Drone[1]);
	$("#DronePrice").text("$" + Math.ceil(250*Math.pow(1.2, Item.Drone[1])));
	$("#ItemDrone").text(Item.Drone[0] + "/" + Item.Drone[1]);

	$("#Drillbot").text(Item.Drillbot[1]);
	$("#DrillbotPrice").text("$" + Math.ceil(600*Math.pow(1.2, Item.Drillbot[1])));
	$("#ItemDrillbot").text(Item.Drillbot[0] + "/" + Item.Drillbot[1]);

	$("#Cabin").text(Item.Cabin[1]);
	$("#CabinPrice").text("$" + Math.ceil(500*Math.pow(1.2, Item.Cabin[1])));

	$("#ItemCrew").text(Item.Crew[0] + "/" +Item.Crew[1]);

	$("#TimesMined").text("Times Mined: " + Stat.TimesMined);
	$("#MaterialsSold").text("Materials Sold: " + Stat.MaterialsSold);
	$("#CashMade").text("Total Cash Made: " + Stat.CashMade);
	$("#FuelUsed").text("Fuel Cells Used: " + Stat.FuelUsed);
	
	$("#JobFuelRecycler").text(Item.Recycler);
	$("#JobCompressor").text(Item.Compressor);
	$("#JobRefiner").text(Item.Refiner);
	if (Stat.Level[1] >= Stat.Level[2]) {
		Stat.Level[0]++;
		$("#Level").text("Level: " + Stat.Level[0]);
		Stat.Level[1] -= Stat.Level[2];
		Stat.Level[2] = 50*Stat.Level[0];
	}
	$("#LevelBar").progressbar({
		value: Stat.Level[1],
	});
}

function Sidebar(Object) {
	if ($("#"+Object).css('display') == "none") {
	$("#Notifications").slideUp();
	$("#Menu").slideUp();
	$("#Update").slideUp();
	$("#"+Object).slideDown();
	}
}

function Notify(text) {
	$('#Notifications').append(text);
	$("#Notifications").scrollTop($("#Notifications").scrollHeight);
}

function Countdown(Bar, Time) {
	if(ResetCount) {
		setTimeout (function(){
			ResetCount = false;
			return;
		},1000)
	}
	else {
		$(Bar).progressbar({value: Time});
		Time--;
		if (Time > 0) {
		setTimeout (function(){
			Countdown(Bar, Time);
		}, 100);
		}
		else {
			if (Bar == "#Collect-Materials") {
				if (Resources.FuelCells < 6 && !Unlock.Market) {
					Notify("<p class = 'list'>Fuel reserves running low, better get some more.</p>");
					Notify("<p class = 'list'>Fuel's a lot, might Recycle the ones we got.</p>");
					Unlock.Market = true;
					$("#FuelCells").show();
					$("#FuelBuy").parent().show();
					$("#Recycle-Fuel").show();
					$("#MarketHeader").show();
				}
				Resources.Carbonite += Math.floor((Math.random()*8)+1);
				Resources.Ironide += Math.floor((Math.random()*3)+0.5);
				if(!Unlock.MaterialsMenu) {
					Unlock.MaterialsMenu = true;
					Notify("<p class = 'list'>The Asteroid is filled with Carbonite, not worth </p>");
					Notify("<p class = 'list'>much, but it's something.</p>");
					$("#Carbonite").parent().show();
				}
				if (Resources.Ironide > 0 && !Unlock.Ironide) {
					Unlock.Ironide = true;
					$("#Ironide").parent().show();
					Notify("<p class = 'list'>At least there's some Ironide.</p>");
				}
				if (Item.RockBreaker) {
					Resources.Carbonite += Math.floor((Math.random()*3)+3);
					Resources.Ironide += Math.floor((Math.random()*4)+2);
					Resources.Alumanon += Math.floor((Math.random()*3)+0.5);
					if (!Unlock.Alumanon && Resources.Alumanon > 0) {
						Notify("<p class = 'list'>Yes! Alumanon is something worth mining,</p>");
						Notify("<p class = 'list'> we should keep working.</p>");
						$("#Alumanon").parent().show();
						Unlock.Alumanon=true;
					}
				}
				if (Item.Refractor) {
					Resources.Carbonite += Math.floor((Math.random()*11)+16);
					Resources.Ironide += Math.floor((Math.random()*6)+6);
					Resources.Alumanon += Math.floor((Math.random()*4)+2);
				}
				$("#Collect-Label").text("Mine Asteroid");
				Text();
				$("#Collect-Materials").progressbar({value: 0});
				MaterialsTimer = 0;
			}
			if (Bar == "#Recycle-Fuel") {
				Resources.FuelCells += Math.floor((Math.random()*7)+3);
				$("#Recycle-Fuel").progressbar({value: 0});
				FuelTimer = 0;
				Text();
				$("#Recycle-Label").text("Recycle Fuel");
			}
		}
	}
}

function Collect() {
	if (MaterialsTimer == 0 && Resources.FuelCells > 0) {
		Stat.TimesMined ++;
		Stat.Level[1] += 8;
		$("#Collect-Label").text("Mining...");
		if (Item.PreCharger) { MaterialsTimer = 20;}
		else { MaterialsTimer = 40;}
		Countdown("#Collect-Materials", MaterialsTimer);
		Resources.FuelCells --;
		Stat.FuelUsed ++;
		Stat.Level[1] += 4;
		Text();
	}
}

function Recycle() {
	if (FuelTimer == 0) {
		$("#Recycle-Label").text("Recycling...");
		FuelTimer = 225;
		Countdown("#Recycle-Fuel", FuelTimer);
	}
}

function Sell(M, V, A) {
	if (eval("Resources." + M + '>= A')) {
		Resources.Cash += V*A;
		Stat.CashMade += V*A;
		Stat.Level[1] += V*A;
		eval("Resources." + M + '-= A');
		Stat.MaterialsSold += A;
	}
	else {
		Resources.Cash += V * eval("Resources." + M);
		Stat.CashMade += V * eval("Resources." + M);
		Stat.Level[1] += V * eval("Resources." + M);
		Stat.MaterialsSold += eval("Resources." + M);
		eval("Resources." + M + '= 0');
	}
	Text();
}

function BuyFuel(A) {
	if (Resources.Cash > 5*A) {
		Resources.FuelCells += A;
		Resources.Cash -= 5*A;
	}
	else {
		Resources.FuelCells += Math.floor(Resources.Cash/5);
		Resources.Cash -= 5* Math.floor(Resources.Cash/5);
	}
	Text();
}

function BuyUpgrade(Object, Money, Mat, Cost) {
	if (Resources.Cash >= Money && eval("Resources." + Mat + '>=' + Cost)) {
		Resources.Cash -= Money;
		eval("Resources." + Mat + '-=' + Cost);
		eval("Item." + Object + " = true");
		Text();
		$("#"+Object).parent().hide();
		$("#Upgrades").show();
		$("#Upgrades").children("#Item"+Object).show();
		if (Object == "RockBreaker") {
			Notify("<p class = 'list'>This will give you access to the core of the asteroid.</p>");
		}
		if (Object == "Filter") {
			$("#SurfaceWorth").text("Carbonite+5, Fuel-1");
			Notify("<p class = 'list'>The Filters will check deeper in the Surface.</p>");
		}
		if (Object == "MoltenLaser") {
			$("#DroneWorth").text("Ironide+5, Fuel-2");
			Notify("<p class = 'list'>Why mine ironide when you can melt it?</p>");
		}
		if (Object == "Refinery") {
			$("#JobRefiner").parent().show();
			$("#Stearite").parent().show();
			Notify("<p class = 'list'>Assign some crew to refine the stearite.</p>");
		}
		if (Object == "Crystaliser") {
			$("#JobCompressor").parent().show();
			$("#Crysite").show();
		}
		if (Object == "PreCharger") {
			$("#Collect-Materials").progressbar({
			max: 20});
			$("#ItemPreCharger").show();
		}
	}
}

function BuyMulti(Object, Initial) {
	var Cost = Math.ceil(Initial*Math.pow(1.2, eval('Item.' + Object + "[1]")));
	if (Resources.Cash >= Cost) {
		eval("Item." + Object + "[1]" + "++");
		Resources.Cash -= Cost;
		Item.Crew[1] = Item.Cabin[1] * 5;
		Text();
		if (!Unlock.Deployment) {
			Unlock.Deployment = true;
			Notify("<p class = 'list'>Now you can chose which units to deploy.</p>");
			$("#DeployHeading").show();
			$("#AutomationHeading").show();
		}
		if (Item.SurfaceSweeper[1] > 0) {
			$("#ItemSurfaceSweeper").parent().show();
		}
		if (Item.Drone[1] > 0) {
			$("#ItemDrone").parent().show();
		}
		if (Item.Drillbot[1] > 0) {
			$("#ItemDrillbot").parent().show();
		}
		if (!Unlock.Crew && Item.Crew[1] > 0) {
			Unlock.Crew = true;
			Notify("<p class = 'list'>Here you can hire and assign jobs to the crew.</p>");
			$("#ItemCrew").parent().show();
			$("#AssigningHeading").show();
			$("#JobFuelRecycler").parent().show();
		}
	}
}

function Deploy(Object, Amount) {
	var Type = eval("Item." + Object + '[0]');
	if (Type + Amount > eval("Item." + Object + '[1]') || Type + Amount < 0) {
		if (Type < Type + Amount) {
			eval("Item." + Object + '[0] = Item.' + Object + "[1]");
		}
		else {
			eval("Item." + Object + '[0] = 0');
		}
	}
	else {
		eval("Item." + Object + '[0] += ' + Amount);
	}
	Text();
}

function Assign(Object, Amount) {
	if (Amount > Item.Recycler || eval("Item." + Object) + Amount < 0) {
		if (eval("Item." + Object) < eval("Item." + Object) + Amount) {
			eval("Item." + Object + '+= Item.Recycler');
			Item.Recycler = 0;
		}
		else {
			eval("Item." + Object + ' = 0');
		}
	}
	else {
		Item.Recycler -= Amount;
		eval("Item." + Object + '+=' + Amount);
	}
	Text();
}

function Update() {
	Text();
	//Unlock Checks
		if (Stat.CashMade > 80 && Stat.MaterialsSold > 20 && !Unlock.SurfaceSweeper) {
			Unlock.SurfaceSweeper = true;
			Notify("<p class = 'list'>Maybe it's time to get some automation.</p>");
			Notify("<p class = 'list'>Surface Sweepers can collect the outer parts of the asteroid.</p>");
			$('#SurfaceSweeper').parent().show();
		}
		if (Stat.CashMade > 2000 && Stat.MaterialsSold > 1000 && !Unlock.Drone) {
			Unlock.Drone = true;
			Notify("<p class = 'list'>Drones can pick up the remaining Ironide from the</p>");
			Notify("<p class = 'list'>edges of the mine.</p>");
			$('#Drone').parent().show();
		}
		if (Stat.CashMade >= 8000 && Stat.FuelUsed >= 1200 && !Unlock.Drillbot) {
			Unlock.Drillbot = true;
			Notify("<p class = 'list'>Time to get some more advanced machinery in the mine</p>");
			$('#Drillbot').parent().show();
		}
		if (Stat.CashMade > 1000 && Stat.TimesMined > 35 && !Unlock.RockBreaker) {
			Unlock.RockBreaker = true;
			Notify("<p class = 'list'>Deeper in the asteroid will give more materials.</p>");
			$('#RockBreaker').parent().show();
			$('#Upgrades').children("h1").show();
		}
		if (Item.Cabin[1] >= 2 && Stat.FuelUsed > 1000 && !Unlock.Refinery) {
			Unlock.Refinery = true;
			Notify("<p class = 'list'>Refining our ironide will give us the stronger material stearite.</p>");
			$('#Refinery').parent().show();
		}
		if (Item.Cabin[1] >= 5 && Item.Refinery && !Unlock.Crystaliser) {
			Unlock.Crystaliser = true;
			Notify("<p class = 'list'>If we compress enough carbonite, we can make some crysite.</p>");
			$('#Crystaliser').parent().show();
		}
		if (Item.SurfaceSweeper[1] >= 5 && Stat.MaterialsSold > 400 && !Unlock.Filter) {
			Unlock.Filter = true;
			Notify("<p class = 'list'>Maybe we could add an extraction filter to the sweepers.</p>");
			$('#Filter').parent().show();
		}
		if (Item.Drone[1] >= 5 && Stat.MaterialsSold > 5000 && !Unlock.MoltenLaser) {
			Unlock.MoltenLaser = true;
			Notify("<p class = 'list'>Super-charging the lasers in the drones will melt</p>");
			Notify("<p class = 'list'>the ironide out!</p>");
			$('#MoltenLaser').parent().show();
		}
		if (Item.RockBreaker && Stat.TimesMined >= 150 && !Unlock.PreCharger) {
			Unlock.PreCharger = true;
			Notify("<p class = 'list'>If we keep the laser charged, the mining time can</p>");
			Notify("<p class = 'list'>be almost cut in half.</p>");
			$('#PreCharger').parent().show();
		}
		if (Stat.FuelUsed >= 50 && !Unlock.Cabins) {
			Unlock.Cabins = true;
			Notify("<p class = 'list'>I think its time to build room for a crew.</p>");
			$('#Cabin').parent().show();
		}
	//Get Materials
		//Surface Sweeper
		if (Resources.FuelCells >= Item.SurfaceSweeper[0]) {
			if (Item.Filter) {
				Resources.Carbonite += Item.SurfaceSweeper[0]*2;
			}
			Resources.Carbonite += Item.SurfaceSweeper[0] * 3;
			Resources.FuelCells -= Item.SurfaceSweeper[0];
			Stat.FuelUsed += Item.SurfaceSweeper[0];
		}
		else {
			if (Item.Filter) {
				Resources.Carbonite += Resources.FuelCells*2;
			}
			Resources.Carbonite += Resources.FuelCells * 3;
			Stat.FuelUsed += Resources.FuelCells;
			Item.SurfaceSweeper[0] = 0;
		}
		//Drone
		if (Resources.FuelCells*2 >= Item.Drone[0]) {
			if (Item.MoltenLaser) {
				Resources.Ironide += Item.Drone[0]*2;
			}
			Resources.Ironide += Item.Drone[0]*3;
			Resources.FuelCells -= Item.Drone[0]*2;
			Stat.FuelUsed += Item.Drone[0]*2;
		}
		else {
			if (Item.MoltenLaser) {
				Resources.Ironide += Resources.FuelCells*2;
			}
			Resources.Ironide += Math.floor(Resources.FuelCells/2) * 3;
			Stat.FuelUsed += Resources.FuelCells;
			Item.Drone[0]=0;
		}
		//Drillbot
		if (Resources.FuelCells*3 >= Item.Drillbot[0]) {
			// if (Item.CrysiteCore) {
			// 	Resources.Alumanon += Item.Drone[0]*2;
			// }
			Resources.Alumanon += Item.Drillbot[0] * 3;
			Resources.FuelCells -= Item.Drillbot[0]*3;
			Stat.FuelUsed += Item.Drillbot[0]*3;
		}
		else {
			// if (Item.CrysiteCore) {
			// 	Resources.Alumanon += Resources.FuelCells*2;
			// }
			Resources.Alumanon += Resources.FuelCells;
			Stat.FuelUsed += Resources.FuelCells;
			Item.Drillbot[0] = 0;
		}

	//Crew
		Resources.Cash -= Item.Crew[0] * 3;
		Resources.FuelCells += Item.Recycler;
		//Refiner
		if (Item.Refiner*3 >= Resources.Carbonite || Item.Refiner >= Resources.Ironide) {
			Item.Refiner = Math.min(Resources.Ironide, Math.floor(Resources.Carbonite/3))
		}
		Resources.Ironide -= Item.Refiner;
		Resources.Carbonite -= Item.Refiner*3;
		Resources.Stearite += Item.Refiner;
		//Crystaliser
		if (Item.Compressor*10 >= Resources.Carbonite) {
			Item.Compressor = Math.floor(Resources.Carbonite/10)
			
		}
		Resources.Carbonite -= Item.Compressor*10;
		Resources.Crysite += Item.Compressor;
	Text();
	$.cookie("Resources", JSON.stringify(Resources), {expires: 100});
	$.cookie("Unlock", JSON.stringify(Unlock), {expires: 100});
	$.cookie("Stat", JSON.stringify(Stat), {expires: 100});
	$.cookie("Item", JSON.stringify(Item), {expires: 100});
	setTimeout (function(){
		Update();
	}, 4000);
}

function Reset() {
	ResetCount = true;
	FuelTimer = 0;
	MaterialsTimer = 0;
	$("#Collect-Materials").progressbar({value: 0});
	$("#Recycle-Fuel").progressbar({value: 0});
	$("#Collect-Label").text("Mine Asteroid");
	$("#Recycle-Label").text("Recycle Fuel");
	if (confirm('Are you sure you want to erase your progress')) {
		$("#Notifications").children().remove();
		$.removeCookie("Resources");
		$.removeCookie("Unlock");
		$.removeCookie("Stat");
		$.removeCookie("Item");
		Start();
	}
}