import * as React from 'react'
import { useState } from 'react';
import PatientWait from './component/PatientWait';
import TestingTab from './component/TestingTab';
import { useSelector } from 'react-redux';
import PatientDoneTesting from './component/PatientDoneTesting';
import { RootState } from '../../../redux/store';
import { ITabProps, Tabs } from '../../common/Tab';
import { DepartmentType } from '../../../model/enum';

const CureProcess = () => {
    const { info } = useSelector((state: RootState) => state.user)
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const getTab = () => {
      const tabs: ITabProps[] = [];
      if(info?.departmentCode !== DepartmentType.canLamSang)
        tabs.push(
          {
            label: "Chờ khám bệnh",
            index: 0,
            Component: <PatientWait/>
          },
        );      

      if(info?.departmentCode !== DepartmentType.tiepDon){
        tabs.push(
          {
            label: info?.departmentCode === DepartmentType.canLamSang ? "Chờ xét nghiệm" : "Đang xét nghiệm",
            index: 1,
            Component: <TestingTab/>
          }
        )
      }
      if(info?.departmentCode !== DepartmentType.tiepDon && info?.departmentCode !== DepartmentType.canLamSang){
        tabs.push(
          {
            label: "Hoàn thành xét nghiệm",
            index: 2,
            Component: <PatientDoneTesting/>
          }
        )
      }
      return tabs;
    }

    React.useEffect(() => {
      setSelectedTab(getTab()[0].index);
    },[])

    return (
        <div className='wrapper-table-content speciality-wrapper'>
            <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={getTab()} />
        </div>
    )
}

export default CureProcess;
