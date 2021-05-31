<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-8">
        <div class="card mb-4" id="form-controls">
          <div class="card-header">
            <h3>Components</h3>
          </div>
          <div class="card-body">
            <div id="VIcon">
              <h4>VIcon</h4>
              <div class="mb-3">
                <v-icon>audio</v-icon>
              </div>
              <pre>
                &lt;v-icon&gt;audio&lt;/v-icon&gt;
              </pre>

              <h5>Spinning VIcon</h5>
              <div class="mb-3">
                <v-icon :spin="true">audio</v-icon>
              </div>
              <pre>
                &lt;v-icon :spin="true" &gt;audio&lt;/v-icon&gt;
              </pre>

              <hr />
            </div>
            <div id="VSwitch">
              <h4 class="pb-1">VSwitch</h4>
              <div class="mb-3">
                <v-switch :value="vswitchVariable" />
              </div>
              <pre>
                &lt;v-switch :value="variable" /&gt;
              </pre>

              <h5 class="pb-1">Disabled VSwitch</h5>
              <div class="mb-3">
                <v-switch :value="vswitchVariable" :disabled="true" />
              </div>
              <pre>
                &lt;v-switch :value="variable" :disabled="true" /&gt;
              </pre>

              <hr />
            </div>
            <div id="VPaginator">
              <h4 class="pb-1">VPaginator</h4>
              <div class="mb-3">
                <v-paginator :meta="meta" />
              </div>
              <pre>
                &lt;v-paginator :meta="meta" /&gt;
              </pre>

              <h5 class="pb-1">VPaginator with alignment</h5>
              <div class="mb-3">
                <v-paginator :meta="meta" align="center"></v-paginator>
              </div>
              <pre>
                &lt;v-paginator :meta="meta" align="..." /&gt;
              </pre>

              <h5 class="pb-1">VPaginator with range</h5>
              <div class="mb-3">
                <v-paginator :meta="meta" :range="2" align="center"></v-paginator>
              </div>
              <pre>
                &lt;v-paginator :meta="meta" :range="..." /&gt;
              </pre>

              <h5 class="pb-1">VPaginator with custom slot</h5>
              <div class="mb-3">
                <v-paginator :meta="meta" :range="2" align="center">
                  <template v-slot:left-arrow>
                    <span class="small">Prev</span>
                  </template>
                  <template v-slot:right-arrow>
                    <span class="small">Next</span>
                  </template>
                </v-paginator>
              </div>
              <pre>
                &lt;v-paginator :meta="meta" :range="..."&gt;
                  &lt;template v-slot:left-arrow&gt;
                    ...Insert here everything you want
                  &lt;/template&gt;
                &lt;v-paginator/&gt;
              </pre>

              <hr />
            </div>
            <div id="VCheckbox">
              <h4 class="pb-1">VCheckbox</h4>
              <div class="mb-3">
                <v-checkbox :value="vcheckboxVariable" label="Checkbox"></v-checkbox>
              </div>
              <pre>
                &lt;v-checkbox :value="variable" /&gt;
              </pre>

              <hr />
            </div>

            <div id="VColorPicker">
              <h4 class="pb-1">VColorPicker</h4>
              <div class="mb-3">
                <v-color-picker :color="color" :colors="colors" />
              </div>
              <pre>
                &lt;v-color-picker :color="color" :colors="colors" /&gt;
              </pre>

              <h5 class="pb-1">VColorPicker with columns</h5>
              <div class="mb-3">
                <v-color-picker :color="color" :colors="colors" :columns="2"/>
              </div>
              <pre>
                &lt;v-color-picker :color="color" :colors="colors" :columns="..." /&gt;
              </pre>

              <hr />
            </div>
            <div id="VDataTable">
              <h4 class="pb-1">VDataTable</h4>
              <div class="mb-3">
                <v-data-table :columns="DTcolumns" :values="DTvalues" :sortable="true" :loading="false"/>
              </div>
              <pre>
                &lt;v-data-table columns="columns" values="values" sortable="true" loading="false" /&gt;
              </pre>

              <h5 class="pb-1">VDataTable with actions</h5>
              <div class="mb-3">
                <v-data-table :columns="DTcolumns" :values="DTvalues" :sortable="true" :loading="false">
                  <template v-slot:actions>
                    <button type="button" class="btn btn-primary btn-sm">Save</button>
                  </template>
                </v-data-table>
              </div>
              <pre>
                &lt;v-data-table columns="columns" values="values" sortable="true" loading="false" /&gt;
              </pre>

              <h5 class="pb-1">VDataTable with sortable columns</h5>
              <div class="mb-3">
                <v-data-table :columns="DTScolumns" :values="DTvalues" :sortable="true" :loading="false">
                  <template v-slot:actions>
                    <button type="button" class="btn btn-primary btn-sm">Save</button>
                  </template>
                </v-data-table>
              </div>
              <pre>
                &lt;v-data-table columns="columns" values="values" sortable="true" loading="false" /&gt;
              </pre>

              <hr />
            </div>
            <div id="VModal">
              <h4 class="pb-1">VModal</h4>
              <div class="mb-3">
                <button type="button" class="btn btn-primary mb-2" @click.stop="mdOpen">Open</button>
                <v-modal ref="modal">
                  <template v-slot:header>
                    <div>Header</div>
                  </template>
                  <template v-slot><p>Body</p></template>
                  <template v-slot:footer><div>Footer</div></template>
                </v-modal>
              </div>
              <pre>
                &lt;v-modal&gt;&lt;template v-slot:header&gt;&lt;/template&gt;&lt;template v-slot:footer&gt;&lt;/template&gt;&lt;template v-slot&gt;&lt;/template&gt;&lt;/v-modal&gt;
              </pre>

              <hr />
            </div>

            <div id="VInlineEditor">
              <h4 class="pb-1">VInlineEditor</h4>
              <div class="mb-3">
                <v-inline-editor :value="IVvalue" :placeholder="IVplaceholder" max-length="10" :uppercase="false"/>
              </div>
              <pre>
                &lt;v-inline-editor :value="value" :placeholder="..." max-length="10" uppercase="false" /&gt;
              </pre>

              <h5 class="pb-1">VInlineEditor with uppercase</h5>
              <div class="mb-3">
                <v-inline-editor :value="IVvalue" :placeholder="IVplaceholder" max-length="10" :uppercase="true"/>
              </div>
              <pre>
                &lt;v-inline-editor :value="value" :placeholder="..." max-length="10" uppercase="<b>true</b>" /&gt;
              </pre>

              <hr />
            </div>

            <div id="VInlineMultiSelect">
              <h4 class="pb-1">VInlineMultiSelect</h4>
              <div class="mb-3">
                <v-inline-multi-select :value="IMSvalues" :options="IMSoptions"></v-inline-multi-select>
              </div>
              <pre>
                &lt;v-inline-multi-select :value="..." :options="..." /&gt;
              </pre>

              <h5 class="pb-1">VInlineMultiSelect with search</h5>
              <div class="mb-3">
                <v-inline-multi-select :value="IMSvalues" :options="IMSoptions" :search-enabled="true"></v-inline-multi-select>
              </div>
              <pre>
                &lt;v-inline-multi-select :value="..." :options="..." <b>:search-enabled="true"</b>/&gt;
              </pre>

              <h5 class="pb-1">VInlineMultiSelect with dropdown</h5>
              <div class="mb-3">
                <v-inline-multi-select :value="IMSvalues" :options="IMSoptions" :show-dropdown="true"></v-inline-multi-select>
              </div>
              <pre>
                &lt;v-inline-multi-select :value="..." :options="..." <b>:show-dropdown="true"</b>/&gt;
              </pre>
              <hr />
            </div>

            <div id="VListGroup">
              <h4 class="pb-1">VListGroup</h4>
              <div class="mb-3">
                <v-list-group :items="Vitems">
                  <template #item="slotProps">
                    <span>{{slotProps.value.label}}</span>
                  </template>
                </v-list-group>
              </div>
              <pre>
                &lt;v-list-group :items="..." :options="..." &gt;<br>
                &lt;template v-slot:item&gt;...&lt;/template&gt;<br>
                &lt;/v-list-group&gt;
              </pre>

              <h5 class="pb-1">VListGroup ordered</h5>
              <div class="mb-3">
                <v-list-group :items="Vitems" :ordered="true">
                  <template #item="slotProps">
                    <span>{{slotProps.value.label}}</span>
                  </template>
                </v-list-group>
              </div>
              <pre>
                &lt;v-list-group :items="..." <b>:ordered="true"</b> &gt;<br>
                &lt;template v-slot:item&gt;...&lt;/template&gt;<br>
                &lt;/v-list-group&gt;
              </pre>

              <h5 class="pb-1">VListGroup with selection</h5>
              <div class="mb-3">
                <v-list-group :items="Vitems" :selectable="true">
                  <template #item="slotProps">
                    <span>{{slotProps.value.label}}</span>
                  </template>
                </v-list-group>
              </div>
              <pre>
                &lt;v-list-group :items="..." <b>:selectable="true"</b> &gt;<br>
                &lt;template v-slot:item&gt;...&lt;/template&gt;<br>
                &lt;/v-list-group&gt;
              </pre>

              <h5 class="pb-1">VListGroup with highlight</h5>
              <div class="mb-3">
                <v-list-group :items="Vitems" :is-highlighted="item => item.id == 1">
                  <template #item="slotProps">
                    <span>{{slotProps.value.label}}</span>
                  </template>
                </v-list-group>
              </div>
              <pre>
                &lt;v-list-group :items="..." <b>:is-highlighted="(item) => {...}"</b> &gt;<br>
                &lt;template v-slot:item&gt;...&lt;/template&gt;<br>
                &lt;/v-list-group&gt;
              </pre>

              <h5 class="pb-1">VListGroup with over</h5>
              <div class="mb-3">
                <v-list-group :items="Vitems" :is-over="item => item.id == 1">
                  <template #item="slotProps">
                    <span>{{slotProps.value.label}}</span>
                  </template>
                </v-list-group>
              </div>
              <pre>
                &lt;v-list-group :items="..." <b>:is-over="(item) => {...}"</b> &gt;<br>
                &lt;template v-slot:item&gt;...&lt;/template&gt;<br>
                &lt;/v-list-group&gt;
              </pre>
              <hr />
            </div>

            <div id="VMultiSelect">
              <h4 class="pb-1">VMultiSelect</h4>
              <div class="mb-3">
                <v-multi-select :value="IMSvalues" :options="IMSoptions"></v-multi-select>
              </div>
              <pre>
                &lt;v-multi-select :value="..." :options="..." /&gt;
              </pre>

              <h5 class="pb-1">VMultiSelect with search</h5>
              <div class="mb-3">
                <v-multi-select :value="IMSvalues" :options="IMSoptions" :search-enabled="true"></v-multi-select>
              </div>
              <pre>
                &lt;v-multi-select :value="..." :options="..." <b>:search-enabled="true"</b>/&gt;
              </pre>

              <h5 class="pb-1">VMultiSelect with dropdown</h5>
              <div class="mb-3">
                <v-multi-select :value="IMSvalues" :options="IMSoptions" :show-dropdown="true"></v-multi-select>
              </div>
              <pre>
                &lt;v-multi-select :value="..." :options="..." <b>:show-dropdown="true"</b>/&gt;
              </pre>
              <hr />
            </div>

            <div id="VContentLoading">
              <h4 class="pb-1">VContentLoading</h4>
              <div class="mb-3 position-relative">
                <v-content-loading notch-size="3x" notch-color="red"></v-content-loading>
              </div>
              <pre>
                &lt;v-content-loading notch-size="3x" /&gt;
              </pre>

              <hr />
            </div>
            <div id="VEntryList">
              <h4 class="pb-1">VEntryList</h4>
              <div class="mb-3">
                <v-entry-list title="Entry list" :items="IMSoptions"></v-entry-list>
              </div>
              <pre>
                &lt;v-entry-list  title="..." :items="..." /&gt;
              </pre>

              <h5 class="pb-1">VEntryList with add</h5>
              <div class="mb-3">
                <v-entry-list title="Entry list" :items="IMSoptions" :can-add="() => true"></v-entry-list>
              </div>
              <pre>
                &lt;v-entry-list  title="..." :items="..."  :can-add="() => true" /&gt;
              </pre>

              <h5 class="pb-1">VEntryList with no actions</h5>
              <div class="mb-3">
                <v-entry-list title="Entry list" :items="IMSoptions" :actions="false"></v-entry-list>
              </div>
              <pre>
                &lt;v-entry-list  title="..." :items="..."  :actions="false"/&gt;
              </pre>

              <h5 class="pb-1">VEntryList with selectable</h5>
              <div class="mb-3">
                <v-entry-list title="Entry list" :items="IMSoptions" :actions="false" :selectable="true"></v-entry-list>
              </div>
              <pre>
                &lt;v-entry-list  title="..." :items="..."  :actions="false" :selectable="true" /&gt;
              </pre>
              <hr />
            </div>
            <div id="VEntrySearch">
              <h4 class="pb-1">VEntrySearch</h4>
              <div class="mb-3">
                <v-entry-search :load="loadItems"></v-entry-search>
              </div>
              <pre>
                &lt;v-entry-search :load="..." /&gt;
              </pre>

              <h5 class="pb-1">VEntrySearch with selectable</h5>
              <div class="mb-3">
                <v-entry-search :load="loadItems" :selectable="true"></v-entry-search>
              </div>
              <pre>
                &lt;v-entry-search :load="..."  :selectable="true" /&gt;
              </pre>

              <h5 class="pb-1">VEntrySearch with icon</h5>
              <div class="mb-3">
                <v-entry-search :load="loadItems" :with-icon="true"></v-entry-search>
              </div>
              <pre>
                &lt;v-entry-search :load="..."  :with-icon="true" /&gt;
              </pre>

              <hr />
            </div>
            <div id="VSelect">
              <h4 class="pb-1">VSelect</h4>
              <div class="mb-3">
                <v-select :value="null" :options="VselectItems" :loading="false"></v-select>
              </div>
              <pre>
                &lt;v-select value="..." :options="..."  :loading="false"/&gt;
              </pre>

              <h5 class="pb-1">VSelect addable</h5>
              <div class="mb-3">
                <v-select :value="null" :options="VselectItems" :loading="false" :addable="true"></v-select>
              </div>
              <pre>
                &lt;v-select value="..." :options="..."  :loading="false" :loading="false" :addable="true"/&gt;
              </pre>

              <h5 class="pb-1">VSelect scrollable</h5>
              <div class="mb-3">
                <v-select :value="null" :options="VselectItems" :loading="false" :scrollable="true"></v-select>
              </div>
              <pre>
                &lt;v-select value="..." :options="..."  :loading="false" :loading="false" :addable="true"/&gt;
              </pre>
              <hr />
            </div>
            <div id="VSwitchButton">
              <h4 class="pb-1">VSwitchButton</h4>
              <div class="mb-3">
                <v-switch-button :value="false">VSwitchButton</v-switch-button>
              </div>
              <pre>
                &lt;v-switch-button value="..."&gt;LABEL&lt;/v-switch-button&gt;
              </pre>

              <hr />
            </div>
            <div id="VMultiSwitcher">
              <h4 class="pb-1">VMultiSwitcher</h4>
              <div class="mb-3">
                <v-multi-switcher value="" :items="msoptions"></v-multi-switcher>
              </div>
              <pre>
                &lt;v-multi-switcher value="" :items="..."&gt;&lt;/v-multi-switcher&gt;
              </pre>

              <hr />
            </div>
            <div id="VNumberPicker">
              <h4 class="pb-1">VNumberPicker</h4>
              <div class="mb-3">
                <v-number-picker :value="0"></v-number-picker>
              </div>
              <pre>
                &lt;v-number-picker :value="0"&gt;&lt;/v-number-picker&gt;
              </pre>

              <h5 class="pb-1">VNumberPicker 2 digits</h5>
              <div class="mb-3">
                <v-number-picker :value="0" :digits="2"></v-number-picker>
              </div>
              <pre>
                &lt;v-number-picker :value="..." :digits="..."&gt;&lt;/v-number-picker&gt;
              </pre>

              <h5 class="pb-1">VNumberPicker Max and Min</h5>
              <div class="mb-3">
                <v-number-picker :value="0" :max="2" :min="-2"></v-number-picker>
              </div>
              <pre>
                &lt;v-number-picker :value="..." :max="..." :min="..."&gt;&lt;/v-number-picker&gt;
              </pre>

              <h5 class="pb-1">VNumberPicker Max, Min in loop mode</h5>
              <div class="mb-3">
                <v-number-picker :value="0" :max="2" :min="-2" :loop="true"></v-number-picker>
              </div>
              <pre>
                &lt;v-number-picker :value="..." :max="..." :min="..." :loop="true"&gt;&lt;/v-number-picker&gt;
              </pre>

              <h5 class="pb-1">VNumberPicker custom step</h5>
              <div class="mb-3">
                <v-number-picker :value="0" :step="3"></v-number-picker>
              </div>
              <pre>
                &lt;v-number-picker :value="..." :step="..."&gt;&lt;/v-number-picker&gt;
              </pre>
              <hr />
            </div>
            <div id="VLetterIcon">
              <h4 class="pb-1">VLetterIcon</h4>
              <div class="mb-3">
                <v-letter-icon color="#ff5000">A</v-letter-icon>
              </div>
              <pre>
                &lt;v-letter-icon color="..."&gt;LETTER&lt;/v-letter-icon&gt;
              </pre>

              <h5 class="pb-1">VLetterIcon with number</h5>
              <div class="mb-3">
                <v-letter-icon color="#ff5000">3</v-letter-icon>
              </div>
              <pre>
                &lt;v-letter-icon color="..."&gt;LETTER&lt;/v-letter-icon&gt;
              </pre>

              <h5 class="pb-1">VLetterIcon with random color</h5>
              <div class="mb-3">
                <v-letter-icon>3</v-letter-icon>
              </div>
              <pre>
                &lt;v-letter-icon &gt;LETTER&lt;/v-letter-icon&gt;
              </pre>

              <h5 class="pb-1">VLetterIcon with random color palette</h5>
              <div class="mb-3">
                <v-letter-icon :colors="palette">3</v-letter-icon>
              </div>
              <pre>
                &lt;v-letter-icon :colors="..." &gt;LETTER&lt;/v-letter-icon&gt;
              </pre>
              <hr />
            </div>
            <div id="VTimePicker">
              <h4 class="pb-1">VTimePicker</h4>
              <div class="mb-3">
                <v-time-picker value="12:30"></v-time-picker>
              </div>
              <pre>
                &lt;v-time-picker value="..."&gt;&lt;/v-time-picker&gt;
              </pre>

              <hr />
            </div>
            <div id="VTimeSlotPicker">
              <h4 class="pb-1">VTimeSlotPicker</h4>
              <div class="mb-3">
                <v-time-slot-picker :value="[]"></v-time-slot-picker>
              </div>
              <pre>
                &lt;v-time-slot-picker :value="[...]"&gt;&lt;/v-time-slot-picker&gt;
              </pre>

              <hr />
            </div>
            <div id="VDatePicker">
              <h4 class="pb-1">VDatePicker</h4>
              <div class="mb-3">
                <v-date-picker></v-date-picker>
              </div>
              <pre>
                &lt;v-date-picker&gt;&lt;/v-date-picker&gt;
              </pre>

              <hr />
            </div>
            <div id="VMultiLevelSelect">
              <h4 class="pb-1">VMultiLevelSelect</h4>
              <div class="mb-3">
                <v-multi-level-select v-model="option" :options="mlsOptions"></v-multi-level-select>
              </div>
              <pre>
                &lt;v-multi-level-select&gt;&lt;/v-multi-level-select&gt;
              </pre>

              <h5 class="pb-1">VMultiLevelSelect multiple selection</h5>
              <div class="mb-3">
                <v-multi-level-select v-model="option" :options="mlsOptions" :multiple="true"></v-multi-level-select>
              </div>
              <pre>
                &lt;v-multi-level-select&gt;&lt;/v-multi-level-select&gt;
              </pre>
              <hr />
            </div>
            <div id="VComparisonGroupSelect">
              <h4 class="pb-1">VComparisonGroupSelect</h4>
              <div class="mb-3">
                <v-comparison-group-select :payload="null" :load-groups="loadGroups" :create-group="createGroup" :add-entry-to-group="addEntryToGroup" :remove-entry-from-group="removeEntryFromGroup"></v-comparison-group-select>
              </div>
              <pre>
                &lt;v-comparison-group-select :payload="null" :load-groups="loadGroups" :create-group="createGroup" :add-entry-to-group="addEntryToGroup" :remove-entry-from-group="removeEntryFromGroup"&gt;&lt;/v-comparison-group-select&gt;
              </pre>

              <hr />
            </div>
            <div id="VAudio">
              <h4 class="pb-1">VAudio</h4>
              <div class="mb-3">
                <v-audio :sources="['https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3']" :timeout="60000" />
              </div>
              <pre>
                &lt;v-audio :sources="['https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3']" :timeout="60000"&gt;&lt;/v-audio&gt;
              </pre>
              <h5 class="pb-1">VAudio that can pause</h5>
              <div class="mb-3">
                <v-audio :sources="['https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3']" :timeout="60000" :can-pause="true" />
              </div>
              <pre>
                &lt;v-audio :sources="['https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3']" :timeout="60000" :can-pause="true"&gt;&lt;/v-audio&gt;
              </pre>
              <h5 class="pb-1">VAudio with color</h5>
              <div class="mb-3">
                <v-audio :sources="['https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3']" :timeout="60000" />
              </div>
              <pre>
                &lt;v-audio :sources="['https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3']" :timeout="60000"&gt;&lt;/v-audio&gt;
              </pre>
              <h5 class="pb-1">VAudio with no existing source</h5>
              <div class="mb-3">
                <v-audio :sources="['https:missing.com/mpthreetest.mp3']" :timeout="60000" />
              </div>
              <pre>
                &lt;v-audio :sources="['https:missing.com/mpthreetest.mp3']" :timeout="60000"&gt;&lt;/v-audio&gt;
              </pre>
              <h5 class="pb-1">VAudio with empty sources</h5>
              <div class="mb-3">
                <v-audio :sources="[]" :timeout="60000" />
              </div>
              <pre>
                &lt;v-audio :sources="[]" :timeout="60000"&gt;&lt;/v-audio&gt;
              </pre>
            </div>
            <div id="VVideo">
              <hr />
              <h4>VVideo</h4>
              <div class="mb-3 d-flex align-items-center justify-content-between">
                <v-video :sources="['http://techslides.com/demos/sample-videos/small.mp4']" width="400px"></v-video>
              </div>
              <pre>&lt;v-video :sources="[urls]" width="400px" /&gt;</pre>

              <hr />
            </div>
            <div id="VModalVideo">
              <h4>VModalVideo</h4>

              <div class="mb-3 d-flex align-items-center justify-content-between">
                <button class="btn btn-primary" @click.stop="openVideo('modalVideo')">Open video</button>
                <v-modal-video title="Video" ref="modalVideo" :sources="['http://techslides.com/demos/sample-videos/small.mp4']"></v-modal-video>
              </div>
              <pre>&lt;v-modal-video title='title' :sources="[urls]" /&gt;</pre>

              <h5>VModalVideo with autostart</h5>

              <div class="mb-3 d-flex align-items-center justify-content-between">
                <button class="btn btn-primary" @click.stop="openVideo('modalVideo2')">Open video</button>
                <v-modal-video title="Video" ref="modalVideo2" :sources="['http://techslides.com/demos/sample-videos/small.mp4']" :autostart="true"></v-modal-video>
              </div>
              <pre>&lt;v-modal-video title='title' :sources="[urls]" :autostart="true"/&gt;</pre>

              <h5>VModalVideo with size</h5>

              <div class="mb-3 d-flex align-items-center justify-content-between">
                <button class="btn btn-primary" @click.stop="openVideo('modalVideo2')">Open video</button>
                <v-modal-video title="Video" ref="modalVideo2" :sources="['http://techslides.com/demos/sample-videos/small.mp4']" size="xl"></v-modal-video>
              </div>
              <pre>&lt;v-modal-video title='title' :sources="[urls]" size="xl"/&gt;</pre>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card sticky-top scroll">
          <div class="card-body">
            <ul class="list-group list-group-flush v-50">
              <li class="list-group-item"><a href="#VIcon">VIcon</a></li>
              <li class="list-group-item"><a href="#VSwitch">VSwitch</a></li>
              <li class="list-group-item"><a href="#VPaginator">VPaginator</a></li>
              <li class="list-group-item"><a href="#VCheckbox">VCheckbox</a></li>
              <li class="list-group-item"><a href="#VColorPicker">VColorPicker</a></li>
              <li class="list-group-item"><a href="#VDataTable">VDataTable</a></li>
              <li class="list-group-item"><a href="#VModal">VModal</a></li>
              <li class="list-group-item"><a href="#VInlineEditor">VInlineEditor</a></li>
              <li class="list-group-item"><a href="#VInlineMultiSelect">VInlineMultiSelect</a></li>
              <li class="list-group-item"><a href="#VListGroup">VListGroup</a></li>
              <li class="list-group-item"><a href="#VMultiSelect">VMultiSelect</a></li>
              <li class="list-group-item"><a href="#VContentLoading">VContentLoading</a></li>
              <li class="list-group-item"><a href="#VEntryList">VEntryList</a></li>
              <li class="list-group-item"><a href="#VEntrySearch">VEntrySearch</a></li>
              <li class="list-group-item"><a href="#VSelect">VSelect</a></li>
              <li class="list-group-item"><a href="#VSwitchButton">VSwitchButton</a></li>
              <li class="list-group-item"><a href="#VMultiSwitcher">VMultiSwitcher</a></li>
              <li class="list-group-item"><a href="#VNumberPicker">VNumberPicker</a></li>
              <li class="list-group-item"><a href="#VLetterIcon">VLetterIcon</a></li>
              <li class="list-group-item"><a href="#VTimePicker">VTimePicker</a></li>
              <li class="list-group-item"><a href="#VTimeSlotPicker">VTimeSlotPicker</a></li>
              <li class="list-group-item"><a href="#VDatePicker">VDatePicker</a></li>
              <li class="list-group-item"><a href="#VMultiLevelSelect">VMultiLevelSelect</a></li>
              <li class="list-group-item"><a href="#VComparisonGroupSelect">VComparisonGroupSelect</a></li>
              <li class="list-group-item"><a href="#VAudio">VAudio</a></li>
              <li class="list-group-item"><a href="#VVideo">VVideo</a></li>
              <li class="list-group-item"><a href="#VModalVideo">VModalVideo</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import VIcon from '../components/VIcon.vue';
import VSwitch from '../components/VSwitch.vue';
import VPaginator from '../components/VPaginator.vue';
import VCheckbox from '../components/VCheckbox.vue';
import VColorPicker from '../components/VColorPicker.vue';
import VDataTable from '../components/VDataTable.vue';
import VModal from '../components/VModal.vue';
import VInlineEditor from '../components/VInlineEditor.vue';
import VInlineMultiSelect from '../components/VInlineMultiSelect.vue';
import VListGroup from '../components/VListGroup.vue';
import VMultiSelect from '../components/VMultiSelect.vue';
import VContentLoading from '../components/VContentLoading.vue';
import VEntryList from '../components/VEntryList.vue';
import VEntrySearch from '../components/VEntrySearch.vue';
import VSelect, { VSelectOption } from '../components/VSelect.vue';
import VSwitchButton from '../components/VSwitchButton.vue';
import VMultiSwitcher from '../components/VMultiSwitcher.vue';
import VNumberPicker from '../components/VNumberPicker.vue';
import VLetterIcon from '../components/VLetterIcon.vue';
import VTimePicker from '../components/VTimePicker.vue';
import VTimeSlotPicker from '../components/VTimeSlotPicker.vue';
import VDatePicker from '../components/VDatePicker.vue';
import VMultiLevelSelect from '../components/VMultiLevelSelect.vue';
import Entry from '../models/Entry';
import EntryGroupItem from '../models/EntryGroupItem';
import VComparisonGroupSelect from '../components/VComparisonGroupSelect.vue';
import VAudio from '../components/VAudio.vue';
import VVideo from '../components/VVideo.vue';
import VModalVideo from '../components/VModalVideo.vue';

import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    VIcon,
    VSwitch,
    VPaginator,
    VCheckbox,
    VColorPicker,
    VDataTable,
    VInlineEditor,
    VModal,
    VInlineMultiSelect,
    VListGroup,
    VMultiSelect,
    VContentLoading,
    VEntryList,
    VEntrySearch,
    VSelect,
    VSwitchButton,
    VMultiSwitcher,
    VNumberPicker,
    VLetterIcon,
    VTimePicker,
    VTimeSlotPicker,
    VDatePicker,
    VMultiLevelSelect,
    VComparisonGroupSelect,
    VAudio,
    VVideo,
    VModalVideo
  }
})
export default class Styleguide extends Vue {
  vswitchVariable = true;

  vcheckboxVariable = true;

  meta = {
    previousPage: 1,
    nextPage: 2,
    lastPage: 3,
    currentPage: 1,
    totalPages: 4
  }

  DPNow = new Date();

  IVvalue = 'Test';
  IVplaceholder = 'Component Label';

  IVNested = {
    test: 'test',
    nested: 'test 2'
  };

  IVKeys = ['test', 'nested'];

  color = '#ff0000';
  colors = ['#0000ff', '#ff0000', '#00ff00'];

  DTcolumns = [{
    sortable: false,
    name: 'test',
    label: 'Test'
  }];

  DTScolumns = [{
    sortable: true,
    name: 'test',
    label: 'Test'
  }];

  DTvalues = [{ test: '1' }, { test: '2' }];

  IMSvalues = [];
  IMSoptions = [
    {
      id: '1',
      name: 'Item 1',
      group: 'Group 1'
    },
    {
      id: '2',
      name: 'Item 2',
      group: 'Group 1'
    },
    {
      id: '3',
      name: 'Item 3',
      group: 'Group 2'
    }
  ]

  Vitems = [
    {
      id: '1',
      label: 'hi'
    },
    {
      id: '2',
      label: 'ciao'
    }
  ]

  VselectItems: Array<VSelectOption> = [
    {
      id: '1',
      text: 'Text 1',
      editable: false
    },
    {
      id: '2',
      text: 'Text 2',
      editable: false
    },
    {
      id: '3',
      text: 'Text 3',
      editable: true
    },
    {
      id: '4',
      text: 'Text 4',
      editable: true
    },
    {
      id: '5',
      text: 'Text 5',
      editable: true
    }
  ];

  msoptions = [
    {
      id: '1',
      text: 'Text 1',
      disabled: false
    },
    {
      id: '2',
      text: 'Text 2',
      disabled: true
    },
    {
      id: '3',
      text: 'Text 3',
      disabled: false
    }
  ];

  option = { };

  mlsOptions = [
    {
      id: '1',
      text: 'Text 1',
      children: [
        {
          id: '4',
          text: 'Text 4'
        },
        {
          id: '5',
          text: 'Text 5'
        }
      ]
    },
    {
      id: '2',
      text: 'Text 2'
    },
    {
      id: '3',
      text: 'Text 3'
    }

  ]

  palette = {
    1: '#33C8FF',
    2: '#FFE36F',
    3: '#5EE96B',
    4: '#F75151',
    5: '#B03EE2',
    6: '#4B5EEF',
    7: '#FF9D00',
    8: '#11D9D2',
    9: '#FD7AD5',
    10: '#8A4DFF',
    11: '#A1CFF7',
    12: '#E2EA2A',
    13: '#C4F0C8',
    14: '#C41854',
    15: '#E2BFF0',
    16: '#468793',
    17: '#EACB8B',
    18: '#06C482',
    19: '#FCBEBE',
    20: '#A0559D'
  };

  gItems: EntryGroupItem[] = [];

  public loadGroups(payload: any): Promise<EntryGroupItem[]> {
    return Promise.resolve(this.gItems);
  }

  public createGroup(group: EntryGroupItem): Promise<EntryGroupItem> {
    group.id = this.gItems.length;
    this.gItems.push(group);
    return Promise.resolve(group);
  }

  public addEntryToGroup(entry: Entry, group: EntryGroupItem): Promise<void> {
    if (group.entries) {
      group.entries.push(entry);
    } else {
      group.entries = [entry];
    }
    return Promise.resolve();
  }

  public removeEntryFromGroup(entry: Entry, group: EntryGroupItem): Promise<void> {
    if (group.entries) {
      const idx = group.entries.indexOf(entry);
      group.entries = group.entries.splice(idx, 1);
    }
    return Promise.resolve();
  }

  public async loadItems(term: string) {
    return Promise.resolve([...this.IMSoptions]);
  }

  public dpOpen() {
    const dp = this.$refs.datePicker as any;
    dp.show();
  }

  public mdOpen() {
    const modal = this.$refs.modal as any;
    modal.show();
  }

  openVideo(which: string) {
    const modalVideo = (this.$refs[which] as any)
    modalVideo.show();
  }
}
</script>
<style scoped>
  .scroll {
      max-height: 100%;
      overflow-y: auto;
  }
</style>
