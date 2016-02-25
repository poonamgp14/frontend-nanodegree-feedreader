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

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('URL are defined', function() {
            for (var i=0; i<allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        it('name are defined', function() {
            for (var i=0; i<allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');

            }
        });
});

        describe('The menu', function() {

            it('Menu is hidden by default', function() {
                expect(document.body.classList.contains('menu-hidden')).toBeDefined();
            });

            it('Menu was displayed', function(){
                var spyEvent;
                spyEvent = spyOnEvent($('.menu-icon-link'),'click');
                $('.menu-icon-link').trigger('click');
                expect('click').toHaveBeenTriggeredOn($('.menu-icon-link'));
                expect(spyEvent).toHaveBeenTriggered();

                expect(document.body.classList).not.toBe('menu-hidden');
            })

            it('Menu was hidden when clicked again', function(){
                var spyEvent;
                spyEvent = spyOnEvent($('.menu-icon-link'),'click');
                $('.menu-icon-link').trigger('click');
                expect('click').toHaveBeenTriggeredOn($('.menu-icon-link'));
                expect(spyEvent).toHaveBeenTriggered();

                expect(document.body.classList.contains('menu-hidden')).toBeDefined();
            })
        });

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

            it('At least a single entry to load', function() {
                var e = 0;
                expect(containerContent.length).toBeGreaterThan(e);
            });
        });

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
