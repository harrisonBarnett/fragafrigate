(this["webpackJsonpfragafrigate-mk2"]=this["webpackJsonpfragafrigate-mk2"]||[]).push([[0],{13:function(t,e,r){},15:function(t,e,r){},16:function(t,e,r){"use strict";r.r(e);var i=r(1),s=r.n(i),a=r(8),o=r.n(a),c=(r(13),r(3)),n=r(4),u=r(2),p=r(6),h=r(5),l=function(){function t(e,r,i){Object(c.a)(this,t),this.type=e,this.size=r,this.position=i,this.hits=0,this.setPosition=this.setPosition.bind(this),this.hit=this.hit.bind(this)}return Object(n.a)(t,[{key:"setPosition",value:function(t){this.position=t}},{key:"hit",value:function(){var t=this.hits;t++,this.hits=t}},{key:"isSunk",value:function(){if(this.hits==this.size)return!0}}]),t}(),m=r(0),d=function(t){Object(p.a)(r,t);var e=Object(h.a)(r);function r(t){var i;return Object(c.a)(this,r),(i=e.call(this,t)).patrol=new l("patrol",2,[]),i.frigate=new l("frigate",3,[]),i.submarine=new l("submarine",3,[]),i.cruiser=new l("cruiser",4,[]),i.carrier=new l("carrier",5,[]),i.receiveAttack=i.receiveAttack.bind(Object(u.a)(i)),i.setPosition=i.setPosition.bind(Object(u.a)(i)),i}return Object(n.a)(r,[{key:"receiveAttack",value:function(t,e){switch(t){case"patrol":if(this.patrol.position.includes(e))return this.patrol.hit(),"attack received";break;default:return}}},{key:"setPosition",value:function(t,e){switch(t){case"patrol":this.patrol.position=e;break;default:return}return this.patrol.position[0]}},{key:"render",value:function(){var t=this,e=[0,1,2,3,4,5,6,7,8,9];return Object(m.jsx)(m.Fragment,{children:Object(m.jsx)("div",{className:"gameboard-container ".concat(this.props.boardType,"-gameboard-container"),id:this.props.boardType+"-container",children:["A","B","C","D","E","F","G","H","I","J"].map((function(r,i){return Object(m.jsx)("div",{className:"gameboard-row",children:e.map((function(e,s){return Object(m.jsx)("div",{id:t.props.boardType+"-"+i+s,className:"gameboard-cell ".concat(t.props.boardType,"-cell"),data:i+""+s,onClick:function(){t.props.handleCellClick(i+""+s)},children:r+"-"+e},s)}))},i)}))})})}}]),r}(s.a.Component),b=function(t){Object(p.a)(r,t);var e=Object(h.a)(r);function r(t){return Object(c.a)(this,r),e.call(this,t)}return Object(n.a)(r,[{key:"render",value:function(){var t=this;return Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)("div",{id:"setup-prompt-window",className:"setup-prompt-window",children:[Object(m.jsxs)("h1",{children:["place your ",this.props.setupState]}),Object(m.jsx)("button",{id:"setup-submission-btn",onClick:function(){t.props.handleSubmitClick()},children:"submit your board"})]})})}}]),r}(s.a.Component),f=function(t){Object(p.a)(r,t);var e=Object(h.a)(r);function r(t){return Object(c.a)(this,r),e.call(this,t)}return Object(n.a)(r,[{key:"render",value:function(){var t=this;return Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)("div",{id:"game-over-container",className:"game-over-container",children:[Object(m.jsxs)("h1",{children:[this.props.winner," won!"]}),Object(m.jsx)("button",{id:"game-over-button",onClick:function(){t.props.handleGameOverClick()},children:"restart"})]})})}}]),r}(s.a.Component),S=(r(15),function(t){Object(p.a)(r,t);var e=Object(h.a)(r);function r(t){var i;return Object(c.a)(this,r),(i=e.call(this,t)).state={setupState:null,winner:null},i.tempSetupArr=[],i.playerCoords=[],i.computerCoords={patrol:[],frigate:[],submarine:[],cruiser:[],carrier:[]},i.computerGuesses=[],i.patrol=new l("patrol",2,[]),i.frigate=new l("frigate",3,[]),i.submarine=new l("submarine",3,[]),i.cruiser=new l("cruiser",4,[]),i.carrier=new l("carrier",5,[]),i.NPCpatrol=new l("patrol",2,[]),i.NPCfrigate=new l("frigate",3,[]),i.NPCsubmarine=new l("submarine",3,[]),i.NPCcruiser=new l("cruiser",4,[]),i.NPCcarrier=new l("carrier",5,[]),i.handleStartMenuClick=i.handleStartMenuClick.bind(Object(u.a)(i)),i.handleSetupClick=i.handleSetupClick.bind(Object(u.a)(i)),i.handleSetupSubmission=i.handleSetupSubmission.bind(Object(u.a)(i)),i.handlePlayerClick=i.handlePlayerClick.bind(Object(u.a)(i)),i.handleGameOverClick=i.handleGameOverClick.bind(Object(u.a)(i)),i}return Object(n.a)(r,[{key:"handleStartMenuClick",value:function(){document.querySelector(".start-menu-container").classList.toggle("hide"),document.querySelector("#setup-container").classList.toggle("show"),document.querySelector(".setup-prompt-window").classList.toggle("show"),this.setState({setupState:"patrol"}),document.querySelector("#setup-submission-btn").disabled=!0}},{key:"handleSetupClick",value:function(t){var e=document.querySelector("#setup-".concat(t));if(this.canPlace(t))switch(e.classList.add("player-occupied"),this.playerCoords.push(t),this.state.setupState){case"patrol":e.classList.add("player-patrol"),this.tempSetupArr.push(t),this.patrol.position.push(t),this.patrol.position.length===this.patrol.size&&(this.tempSetupArr=[],this.setState({setupState:"frigate"}));break;case"frigate":e.classList.add("player-frigate"),this.tempSetupArr.push(t),this.frigate.position.push(t),this.frigate.position.length===this.frigate.size&&(this.tempSetupArr=[],this.setState({setupState:"submarine"}));break;case"submarine":e.classList.add("player-submarine"),this.tempSetupArr.push(t),this.submarine.position.push(t),this.submarine.position.length===this.submarine.size&&(this.tempSetupArr=[],this.setState({setupState:"cruiser"}));break;case"cruiser":e.classList.add("player-cruiser"),this.tempSetupArr.push(t),this.cruiser.position.push(t),this.cruiser.position.length===this.cruiser.size&&(this.tempSetupArr=[],this.setState({setupState:"carrier"}));break;case"carrier":if(e.classList.add("player-carrier"),this.tempSetupArr.push(t),this.carrier.position.push(t),this.carrier.position.length===this.carrier.size)this.tempSetupArr=[],alert("setup complete"),document.querySelectorAll(".setup-cell").forEach((function(t){t.classList.toggle("unclickable")})),document.querySelector("#setup-submission-btn").disabled=!1;break;default:alert("something went wrong")}else alert("reassess placement please")}},{key:"handleSetupSubmission",value:function(){document.querySelector("#setup-container").classList.toggle("show"),document.querySelector("#setup-prompt-window").classList.toggle("show"),this.renderPlayerBoard(),this.randomizeComputerBoard()}},{key:"renderPlayerBoard",value:function(){this.patrol.position.forEach((function(t){document.querySelector("#player-".concat(t)).classList.add("player-patrol")})),this.frigate.position.forEach((function(t){document.querySelector("#player-".concat(t)).classList.add("player-frigate")})),this.submarine.position.forEach((function(t){document.querySelector("#player-".concat(t)).classList.add("player-submarine")})),this.cruiser.position.forEach((function(t){document.querySelector("#player-".concat(t)).classList.add("player-cruiser")})),this.carrier.position.forEach((function(t){document.querySelector("#player-".concat(t)).classList.add("player-carrier")})),document.querySelectorAll(".player-cell").forEach((function(t){t.style="pointer-events: none;"})),document.querySelector("#player-container").classList.toggle("show")}},{key:"randomizeComputerBoard",value:function(){function t(){return Math.floor(99*Math.random()).toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1})}for(;this.NPCpatrol.position.length<this.NPCpatrol.size;){var e=t();this.canPlace(e)&&!this.computerCoords.patrol.includes(e)?(this.NPCpatrol.position.push(e),this.tempSetupArr.push(e),this.computerCoords.patrol.push(e)):(this.NPCpatrol.position=[],this.tempSetupArr=[],this.computerCoords.patrol=[]),this.tempSetupArr=[]}for(;this.NPCfrigate.position.length<this.NPCfrigate.size;){e=t();this.canPlace(e)&&!this.computerCoords.frigate.includes(e)?(this.NPCfrigate.position.push(e),this.tempSetupArr.push(e),this.computerCoords.frigate.push(e)):(this.NPCpatrol.position=[],this.tempSetupArr=[],this.computerCoords.patrol=[]),this.tempSetupArr=[]}for(;this.NPCsubmarine.position.length<this.NPCsubmarine.size;){e=t();this.canPlace(e)&&!this.computerCoords.submarine.includes(e)?(this.NPCsubmarine.position.push(e),this.tempSetupArr.push(e),this.computerCoords.submarine.push(e)):(this.NPCpatrol.position=[],this.tempSetupArr=[],this.computerCoords.patrol=[]),this.tempSetupArr=[]}for(;this.NPCcruiser.position.length<this.NPCcruiser.size;){e=t();this.canPlace(e)&&!this.computerCoords.cruiser.includes(e)?(this.NPCcruiser.position.push(e),this.tempSetupArr.push(e),this.computerCoords.cruiser.push(e)):(this.NPCpatrol.position=[],this.tempSetupArr=[],this.computerCoords.patrol=[]),this.tempSetupArr=[]}for(;this.NPCcarrier.position.length<this.NPCcarrier.size;){e=t();this.canPlace(e)&&!this.computerCoords.carrier.includes(e)?(this.NPCcarrier.position.push(e),this.tempSetupArr.push(e),this.computerCoords.carrier.push(e)):(this.NPCpatrol.position=[],this.tempSetupArr=[],this.computerCoords.patrol=[]),this.tempSetupArr=[]}this.NPCpatrol.position.length===this.NPCpatrol.size&&this.NPCfrigate.position.length===this.NPCfrigate.size&&this.NPCsubmarine.position.length===this.NPCsubmarine.size&&this.NPCcruiser.position.length===this.NPCcruiser.size&&this.NPCcarrier.position.length===this.NPCcarrier.size||(this.NPCpatrol.position=[],this.NPCfrigate.position=[],this.NPCsubmarine.position=[],this.NPCcruiser.position=[],this.NPCcarrier.position=[],this.randomizeComputerBoard()),this.renderComputerBoard()}},{key:"renderComputerBoard",value:function(){this.NPCpatrol.position.forEach((function(t){var e=document.querySelector("#computer-".concat(t));e.classList.add("computer-occupied"),e.classList.add("computer-patrol")})),this.NPCfrigate.position.forEach((function(t){var e=document.querySelector("#computer-".concat(t));e.classList.add("computer-occupied"),e.classList.add("computer-frigate")})),this.NPCsubmarine.position.forEach((function(t){var e=document.querySelector("#computer-".concat(t));e.classList.add("computer-occupied"),e.classList.add("computer-submarine")})),this.NPCcruiser.position.forEach((function(t){var e=document.querySelector("#computer-".concat(t));e.classList.add("computer-occupied"),e.classList.add("computer-cruiser")})),this.NPCcarrier.position.forEach((function(t){var e=document.querySelector("#computer-".concat(t));e.classList.add("computer-occupied"),e.classList.add("computer-carrier")})),document.querySelector("#computer-container").classList.toggle("show"),this.forceUpdate()}},{key:"canPlace",value:function(t){var e=parseInt(t);if(0===this.tempSetupArr.length)return!0;if(1===this.tempSetupArr.length){if(9==this.tempSetupArr[0].charAt(1)&&0==t.charAt(1)||0==this.tempSetupArr[0].charAt(1)&&9==t.charAt(1))return!1;if(this.tempSetupArr[0]==e+10||this.tempSetupArr[0]==e-10)return!0;if(this.tempSetupArr[0]==e+1||this.tempSetupArr[0]==e-1)return!0}else if(this.tempSetupArr.sort((function(t,e){return t-e})),1===Math.abs(this.tempSetupArr[0]-this.tempSetupArr[1])){if((this.tempSetupArr[0]==e+1||this.tempSetupArr[0]==e-1||this.tempSetupArr[this.tempSetupArr.length-1]==e+1||this.tempSetupArr[this.tempSetupArr.length-1]==e-1)&&this.tempSetupArr[0].charAt(0)==t.charAt(0))return!0}else if(this.tempSetupArr[0]==e+10||this.tempSetupArr[0]==e-10||this.tempSetupArr[this.tempSetupArr.length-1]==e+10||this.tempSetupArr[this.tempSetupArr.length-1]==e-10)return!0}},{key:"handlePlayerClick",value:function(t){var e=document.querySelector("#computer-".concat(t)),r=e.classList[3];switch(r){case"computer-patrol":this.NPCpatrol.hit(),e.classList.toggle("hit");break;case"computer-frigate":this.NPCfrigate.hit(),e.classList.toggle("hit");break;case"computer-submarine":this.NPCsubmarine.hit(),e.classList.toggle("hit");break;case"computer-cruiser":this.NPCcruiser.hit(),e.classList.toggle("hit");break;case"computer-carrier":this.NPCcarrier.hit(),e.classList.toggle("hit");break;default:e.classList.toggle("miss")}this.checkShip("player",r),this.checkWin("player"),this.computerMove()}},{key:"checkShip",value:function(t,e){if("player"===t)switch(e){case"computer-patrol":this.NPCpatrol.isSunk()&&alert("sunk computer patrol");break;case"computer-frigate":this.NPCfrigate.isSunk()&&alert("sunk computer frigate");break;case"computer-submarine":this.NPCsubmarine.isSunk()&&alert("sunk computer submarine");break;case"computer-cruiser":this.NPCcruiser.isSunk()&&alert("sunk computer cruiser");break;case"computer-carrier":this.NPCcarrier.isSunk()&&alert("sunk computer carrier")}else switch(e){case"player-patrol":this.patrol.isSunk()&&alert("sunk player patrol boat");break;case"player-frigate":this.frigate.isSunk()&&alert("sunk player frigate boat");break;case"player-submarine":this.submarine.isSunk()&&alert("sunk player submarine boat");break;case"player-cruiser":this.cruiser.isSunk()&&alert("sunk player cruiser boat");break;case"player-carrier":this.carrier.isSunk()&&alert("sunk player carrier boat")}}},{key:"checkWin",value:function(t){if("player"===t){if(!(this.NPCpatrol.isSunk()&&this.NPCfrigate.isSunk()&&this.NPCsubmarine.isSunk()&&this.NPCcruiser.isSunk()&&this.NPCcarrier.isSunk()))return;this.setState({winner:"you"}),this.gameOver("player")}else if("computer"===t){if(!(this.patrol.isSunk()&&this.frigate.isSunk()&&this.submarine.isSunk()&&this.cruiser.isSunk()&&this.carrier.isSunk()))return;this.setState({winner:"computer"}),this.gameOver("computer")}}},{key:"gameOver",value:function(t){document.querySelector("#game-over-container").classList.toggle("show")}},{key:"computerMove",value:function(){var t=Math.floor(99*Math.random()).toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1}),e=document.querySelector("#player-".concat(t)),r=e.classList[2];if(this.computerGuesses.includes(t))this.computerMove();else{if(this.playerCoords.includes(t)){switch(r){case"player-patrol":this.patrol.hit();break;case"player-frigate":this.frigate.hit();break;case"player-submarine":this.submarine.hit();break;case"player-cruiser":this.cruiser.hit();break;case"player-carrier":this.carrier.hit()}e.classList.toggle("hit")}else e.classList.toggle("miss");this.computerGuesses.push(t)}this.checkShip("computer",r),this.checkWin("computer")}},{key:"handleGameOverClick",value:function(){window.location.reload(!0)}},{key:"render",value:function(){return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)("div",{className:"start-menu-container",children:[Object(m.jsx)("h1",{children:"Welcome to Frag-A-Frigate"}),Object(m.jsx)("button",{onClick:this.handleStartMenuClick,children:"click to begin"})]}),Object(m.jsx)(d,{boardType:"setup",handleCellClick:this.handleSetupClick}),Object(m.jsx)(b,{setupState:this.state.setupState,handleSubmitClick:this.handleSetupSubmission}),Object(m.jsx)(d,{boardType:"player"}),Object(m.jsx)(d,{boardType:"computer",handleCellClick:this.handlePlayerClick}),Object(m.jsx)(f,{winner:this.state.winner,handleGameOverClick:this.handleGameOverClick})]})}}]),r}(s.a.Component)),g=function(t){t&&t instanceof Function&&r.e(3).then(r.bind(null,17)).then((function(e){var r=e.getCLS,i=e.getFID,s=e.getFCP,a=e.getLCP,o=e.getTTFB;r(t),i(t),s(t),a(t),o(t)}))};o.a.render(Object(m.jsx)(s.a.StrictMode,{children:Object(m.jsx)(S,{})}),document.getElementById("root")),g()}},[[16,1,2]]]);
//# sourceMappingURL=main.05f1ea44.chunk.js.map