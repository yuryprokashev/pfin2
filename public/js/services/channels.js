// channels is Service, which provides "publish-subscribe" for all other app components
pf.service('channels', ['$log', function ( $log ) {
    
    // 'channels is internal property, and should not be exposed outside.
    var channels = {};
    
    var subUid = -1;
    
//    $log.info('this is Channels Service');
    
    this.subscribe = function ( channel, callback ) {
        
        // if there is no such channel -> create it as empty array
        if(!channels[channel]) {
            channels[channel] = [];
        }
        
        var token = ( ++subUid ).toString();
        channels[channel].push({
            token: token,
            func: callback
        });
        
        return token;
        
    };
    
    this.publish = function ( channel, args ) {
        
        // if channel does not exists -> return false
        if (!channels[channel]) {
            return false;
        }
        
        var subs = channels[channel]
        // length of 'subs' is equal to subs.lenght, if 'subs' exists. Otherwise, it is 0.
        var len = subs ? subs.length : 0;
        
        while (len--) {
//            $log.debug('Invoking Function: ' + subs[len].func )
            subs[len].func( channel, args );
        }
        
        return this;
        
    };
    
    this.unsubscribe = function () {
        
    };
    
    this.getChannelGroup = function ( group ) {
        var c = {
            currency: {
                update: 'currency:update',
                updated: 'currency:updated'
            },
            category: {
                update: 'category:update',
                updated: 'category:updated'
            },
            expense: {
                save: 'expense:save',
                saved: 'expense:saved',
                delete: 'expense:delete',
                deleted:'expense:deleted'
            },
            charts: {
                chart1: {
                    ready: 'charts:chart1:ready'
                },
                chart2: {
                    ready: 'charts:chart2:ready'
                },
                chart3: {
                    ready: 'charts:chart3:ready'
                },
                chart4: {
                    ready: 'charts:chart4:ready'
                }
            }
        };
        
        if (!group) {
            return c;
        }
        
        else if (c[ group ]) {
            return c[ group ];
        }
        
        else {
            $log.error('no such group or group muct be a string')
            return null;
        }
    };
    
    // returns channels available for given object type: directive, controller or service and given name
    this.getChannels = function ( type, name ) {
        var allChannels = {
            newExpense: 'expense:save'
        }
        var c = {
            services: {
                expenses: {
                    chart1Ready: 'charts:chart1:ready'
                },
                charts: {
                    chart1Ready: 'charts:chart1:ready',
                }
            }
        }
        return c[ type ][ name ];
    }
    
}]);