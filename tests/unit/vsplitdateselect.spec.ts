import { mount, Wrapper } from '@vue/test-utils'
import { expect } from 'chai'
import moment from 'moment';
import VSplitDateSelect from '../../src/components/VSplitDateSelect.vue'

describe('VSplitDateSelect', () => {
  let component: Wrapper<Vue>;

  describe('with empty data', () => {
    beforeEach(() => {
      component = mount(VSplitDateSelect, {
        propsData: {
          minDate: moment('2020-02-02', 'YYYY-MM-DD').toDate(),
          maxDate: moment('2023-10-10', 'YYYY-MM-DD').toDate()
        }
      });
    });

    it('displays without selected values', () => {
      expect(component.find('.v-split-date-select__day').exists()).to.eq(true);
      const day = component.get('.v-split-date-select__day').element as HTMLSelectElement;
      expect(day.value).to.eq('');
    });

    it('has a min date that restricts selectables', async () => {
      const year = component.get('.v-split-date-select__year');
      const year2020 = year.find('option[value="2020"]');
      expect(year2020.exists()).to.eq(true);
      await year2020.setSelected();

      const month = component.get('.v-split-date-select__month');
      const month01 = month.find('option[value="0"]');
      expect(month01.exists()).to.eq(false);

      const month02 = month.find('option[value="1"]');
      expect(month02.exists()).to.eq(true);
      await month02.setSelected();

      const day = component.get('.v-split-date-select__day');
      const day01 = day.find('option[value="1"]');
      expect(day01.exists()).to.eq(false);

      const day02 = day.find('option[value="2"]');
      expect(day02.exists()).to.eq(true);
      await day02.setSelected();
    });
  });

  describe('with an initial value', () => {
    beforeEach(() => {
      component = mount(VSplitDateSelect, {
        propsData: {
          value: '2022-01-03',
          minDate: moment('2020-02-02', 'YYYY-MM-DD').toDate(),
          maxDate: moment('2023-10-10', 'YYYY-MM-DD').toDate()
        }
      });
    })

    it('shows the selected date', () => {
      const day = component.get('.v-split-date-select__day').element as HTMLSelectElement;
      expect(day.value).to.eq('3');

      const month = component.get('.v-split-date-select__month').element as HTMLSelectElement;
      expect(month.value).to.eq('0');

      const year = component.get('.v-split-date-select__year').element as HTMLSelectElement;
      expect(year.value).to.eq('2022');
    });

    it('resets dates when less than min date', async () => {
      expect(component.vm.$data.month).to.eq(0);
      const year = component.get('.v-split-date-select__year');
      const year2020 = year.find('option[value="2020"]');
      expect(year2020.exists()).to.eq(true);
      await year2020.setSelected();

      expect(component.vm.$data.year).to.eq(2020);
      expect(component.vm.$data.month).to.eq(null);
    });

    it('resets dates when greater than max date', async () => {
      const month = component.get('.v-split-date-select__month');
      const month12 = month.find('option[value="11"]');
      expect(month12.exists()).to.eq(true);
      await month12.setSelected();

      expect(component.vm.$data.month).to.eq(11);
      const year = component.get('.v-split-date-select__year');
      const year2020 = year.find('option[value="2023"]');
      expect(year2020.exists()).to.eq(true);
      await year2020.setSelected();

      expect(component.vm.$data.year).to.eq(2023);
      expect(component.vm.$data.month).to.eq(null);
    });

    it('the value can be changed via select', async () => {
      const year = component.get('.v-split-date-select__year');
      const year2022 = year.find('option[value="2023"]');
      expect(year2022.exists()).to.eq(true);
      await year2022.setSelected();

      const month = component.get('.v-split-date-select__month');
      const month2022 = month.find('option[value="2"]');
      expect(month2022.exists()).to.eq(true);
      await month2022.setSelected();

      const day = component.get('.v-split-date-select__day');
      const day2022 = day.find('option[value="5"]');
      expect(day2022.exists()).to.eq(true);
      await day2022.setSelected();
      await component.vm.$nextTick();

      const [first, second, third] = component.emitted().input as string[][];

      expect(first[0]).to.eq('2023-01-03')
      expect(second[0]).to.eq('2023-03-03')
      expect(third[0]).to.eq('2023-03-05')
    });

    it('has a max date that restricts selectables', async () => {
      const year = component.get('.v-split-date-select__year');
      const year2024 = year.find('option[value="2024"]');
      expect(year2024.exists()).to.eq(false);

      const year2023 = year.find('option[value="2023"]');
      expect(year2023.exists()).to.eq(true);
      await year2023.setSelected();

      const month = component.get('.v-split-date-select__month');
      const month12 = month.find('option[value="11"]');
      expect(month12.exists()).to.eq(false);

      const month10 = month.find('option[value="9"]');
      expect(month10.exists()).to.eq(true);
      await month10.setSelected();

      const day = component.get('.v-split-date-select__day');
      const day11 = day.find('option[value="11"]');
      expect(day11.exists()).to.eq(false);

      const day10 = day.find('option[value="10"]');
      expect(day10.exists()).to.eq(true);
      await day10.setSelected();

      const emitted = component.emitted().input as any;

      expect(emitted[emitted.length - 1][0]).to.eq('2023-10-10')
    });
  });
});
