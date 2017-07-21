function save_status(){
    chrome.storage.sync.set(
        {'saved_status': document.getElementById('1').value}, 
        function(){});
}

function load_status(){
    chrome.storage.sync.get(
        {
			'saved_status': 'UNCENSORED'},
       function(items){
			document.getElementById('1').value = items.saved_status;
			if(document.getElementById('1').value==="UNCENSORED"){
				document.getElementById('1').className="uncensored_btn_class";
				document.getElementById('2').src="uncensored wikipedia logo.png";
				chrome.runtime.sendMessage("uncensored");
			}
    
			else if(document.getElementById('1').value==="CENSORED"){
				document.getElementById('1').className="censored_btn_class";
				document.getElementById('2').src="censored wikipedia logo.png";
				chrome.runtime.sendMessage("censored");
			}
		}
	); 
}

document.addEventListener('DOMContentLoaded', function(){
    load_status();
    
    document.getElementById('1').addEventListener('click', function (){
        if(document.getElementById('1').value==="UNCENSORED"){
            document.getElementById('1').value="CENSORED";
            document.getElementById('1').className="censored_btn_class";
			document.getElementById('2').src="censored wikipedia logo.png";
			chrome.runtime.sendMessage("censored");
        }
    
        else if(document.getElementById('1').value==="CENSORED"){
            document.getElementById('1').value="UNCENSORED";
            document.getElementById('1').className="uncensored_btn_class";
			document.getElementById('2').src="uncensored wikipedia logo.png";
			chrome.runtime.sendMessage("uncensored");			
        }
        save_status();
    });
	
	document.getElementById('2').addEventListener('click', function (){
		chrome.runtime.sendMessage("wikipedia");
	});
});
