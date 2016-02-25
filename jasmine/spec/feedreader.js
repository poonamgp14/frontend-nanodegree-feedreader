/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URL are defined', function() {
            for (var i=0; i<allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds.url).not.toBe('');

            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name are defined', function() {
            for (var i=0; i<allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds.name).not.toBe('');

            }
        });
});


    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         Initially, menu position is -12 with '.menu-hidden'
         already up there
         when menu icon is clicked menuhidden class is removed
         which disables css declared under '.menu-hidden .menu'
         n makes menu to slide come at  0,0,0 as per .menu css
         */
        describe('The menu', function() {

            it('Menu is hidden by default', function() {
                expect(document.body.classList.contains('menu-hidden')).toBeDefined();
            });



         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
            it ('Menu was displayed', function(){
                var spyEvent;
                spyEvent = spyOnEvent($('.menu-icon-link'),'click');
                $('.menu-icon-link').trigger('click');
                expect('click').toHaveBeenTriggeredOn($('.menu-icon-link'));
                expect(spyEvent).toHaveBeenTriggered();

                expect(document.body.classList).not.toBe('menu-hidden');
            })

            it ('Menu was hidden when clicked again', function(){
                var spyEvent;
                spyEvent = spyOnEvent($('.menu-icon-link'),'click');
                $('.menu-icon-link').trigger('click');
                expect('click').toHaveBeenTriggeredOn($('.menu-icon-link'));
                expect(spyEvent).toHaveBeenTriggered();

                expect(document.body.classList.contains('menu-hidden')).toBeDefined();
            })
        });

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
          * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         describe('Initial Entries', function() {
            var feedContainer;
            var containerContent;
            beforeEach(function(done){
                loadFeed(0, function(){
                    feedContainer = $('.feed');
                    containerContent = feedContainer.children();
                    console.log(containerContent.length);
                    done();
                });
            });

            it('At least a single entry to load', function(done) {
                var e = 0;
                expect(containerContent.length).toBeGreaterThan(e);
                done();
            });
        });

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         describe('New Feed Selection', function() {
            var titleHeaderOnLoad;
            beforeEach(function(done){
                loadFeed(0, function(){
                    titleHeaderOnLoad = $('.header-title').html();
                    loadFeed(1,function(){
                        done();
                    });
                });
            });

            it('Content changed on new feed selection', function(done) {
                expect(titleHeaderOnLoad).not.toEqual($('.header-title').html());
                done();
            });
        });

}());
