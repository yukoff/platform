/*jslint nomen:true*/
/*global define*/
define([
    'underscore',
    'orotranslation/js/translator',
    'oro/datagrid/action/mass-action',
    'oroui/js/messenger'
], function (_, __, MassAction, messenger) {
    'use strict';

    var MergeMassAction;

    /**
     * Merge mass action class.
     *
     * @export  oro/datagrid/action/merge-mass-action
     * @class   oro.datagrid.action.MergeMassAction
     * @extends oro.datagrid.action.MassAction
     */
    MergeMassAction = MassAction.extend({
        /**
         * Initialize view
         *
         * @param {Object} options
         * @param {Object} [options.launcherOptions] Options for new instance of launcher object
         * @constructor
         */
        initialize: function (options) {
            MergeMassAction.__super__.initialize.apply(this, arguments);
            this.on('preExecute', this.onPreExecute, this);
        },

        /**
         * @param {object} event Backbone event object
         * @param {object} options Additional param options needed to stop action
         */
        onPreExecute: function (event, options) {
            var selectionState, isInset, length, totalRecords, validationMessage, maxLength;

            maxLength = this.max_element_count;
            selectionState = this.datagrid.getSelectionState();
            isInset = selectionState.inset;
            length = Object.keys(selectionState.selectedModels).length;

            if (!isInset) {
                totalRecords = this.datagrid.collection.state.totalRecords;
                length = totalRecords - length;
            }

            if (length > maxLength) {
                options.doExecute = false;
                validationMessage = __('oro.entity_merge.mass_action.validation.maximum_records_error', {number: maxLength});
                messenger.notificationFlashMessage('error', validationMessage);
            }

            if (length < 2) {
                options.doExecute = false;
                messenger.notificationFlashMessage('error', __('oro.entity_merge.mass_action.validation.minimum_records_error', {number: maxLength}));
            }
        }
    });

    return MergeMassAction;
});
