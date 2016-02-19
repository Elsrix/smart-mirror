##SmartMirror-Angular-Annyang

I was motivated by the _HomeMirror_ project by **Hannah Mitt** [[link]](https://github.com/HannahMitt/HomeMirror). One of the biggest issues was looking for two ways mirror. After looking hard, I finally found a factory based in Singapore who could sell me two ways mirror. I have purchased and built one mirror based on Hannah Mitt project and it was pretty awesome.
<br/>
The next thing that I wanted to do it to add _interactivity_ into the project. Currently, the display device (in my case, Nexus 7 & Surface Pro 3) is hidden behind the mirror, hence, the touch surface becomes inaccessible. I have started to explore some solutions. I have forked **Evan Cohen** [[SmartMirror]](https://github.com/evancohen/smart-mirror) project so that I can work with Smart Mirror Open Source community.
<br/>
<br/>
###Project Demo Page
Click this to see on your browser: [[link]](https://4tee.github.io/smart-mirror/).
<br/>
<br/>
###In Action
How to build a mirror [[Youtube]](https://youtu.be/Ej8670gUz20).<br/>
Testing the first page [[Youtube]](https://youtu.be/vG80heyKBfs).
<br/>
<br/>
###1. Using Voice Command
####Google Now
Since the HomeMirror project was initially built on Android platform, _Google Now_ is the most promising feature to look into it. Since _KitKit_  (Android 4.4) and above, Google Now voice command can be activated from anywhere in Android even if the screen is Off. Awesome. The only catch is that we have to use keyword _OK Google_ each time when we want to activate. _Open Mic+_  (FREE) app offers users to replace the built-in command voice any other keyword. With combination with _Tasker_ ($4.99) app, there is a huge potential on what it can be done with it. 
<br/>
<br/>
<p align="center">
  <img src="http://cdn01.androidauthority.net/wp-content/uploads/2013/06/Google-Now-Voice-Search1-645x386.jpg" alt="Google Now Voice Search"/><br/>Sample photo taken from Android Authority
</p>
<br/>
After experimenting for sometimes, I abandoned this approach. 2 reasons. One is that I need the background to become black while the text is in white color for better mirror experience. Next, i want it to be able to use in any OS platform and device.
<br/>
<br/>
####Web App in AngularJS
<p align="center">
  <img align="left" src="https://angularjs.org/img/AngularJS-large.png" alt="AngularJS Logo"/>
</p>
Since we are not using _Google Now_ for the project, I have decided to go for web app since it can be easily run on any platform. All I need will be the Speech Recognition engine and some UI elements using JavaScript, CSS and HTML. I found somewhere on the web about _AngularJS_. I have been working in Java for sometimes and I thought I will give a shot. It is a good learning opportunity and soon enough, I really love AngularJS for its MVC framework. Simple, clean and magical.. Kudo and two thumbs up to _Miško Hevery_ who created this framework.
<br/>
<br/>
####Annyang Speech Recognition
While looking at **Evan Cohen** [[SmartMirror]](https://github.com/evancohen/smart-mirror) project, I found something interesting - _Annyang_ Speech Recognition JavaScript [[lib]](https://github.com/TalAter/annyang). [[Annyang]](https://github.com/TalAter/annyang) is a small lightweight library that uses the build-in Speech Recognition API. It was created by **TalAlter** and it it really very easy to use it. Chrome works really well with Annyang library and since chrome support full screen mode, it is my choice of platform for this project.
<br/>
<br/>
##How-to
Now you are sold and you will build one for yourselve or someone special. I have prepared this **master** branch for you so that you can build and extend your own Smart Mirror version. In this branch, you have the main page and weather for sample.
<br/>
<br/>
###Hardware
1. Two-way mirror
2. A monitor with Computer or a Tablet (basically, you need a display panel behind a mirror. If you have any other idea, feel free)

<br/>
###Software
1. First thing first, fork/download this **master** branch into your own.
2. Github gives you free web hosting. To make use it, in your github project, you have to create a branch **gh-pages**. You can click on **Branch:Master** button. Type __gh-pages__ in __find or create the branch__ textbox. After you create the branch, your project URL will be __https://[username].github.io/smart-mirror/__.
Note: This is for people who fork the project in github. For peopel who download, go to step 3 instead.
<p align="center">
  <img src="https://camo.githubusercontent.com/77f4e32f0089eec373d642ec63244fd8155c610a/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f323732332f34353832322f63323662366364322d353765332d313165322d383865322d3236376566313935323032352e706e67" alt="Create a branch"/>
</p>
3. Now you want to modify or use it in your own local computer. To do it, you will need Web Server. I recommend using MAMP for Mac users and LAMP for Win users. Once you have installed and setup, change the directories to point to the downloaded directory.

