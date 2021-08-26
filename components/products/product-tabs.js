import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Benefits from "./benefits";
import WhereToBuy from "./where-to-buy";
import "react-tabs/style/react-tabs.css";

export default class ProductTabs extends React.Component {
  render() {
    return (
      <div className="tabs">
        <Tabs>
          <TabList>
            <Tab>Benefits</Tab>
            <Tab>Where to buy</Tab>
          </TabList>
          <TabPanel id="tab1" title="Benefits">
            <div style={{ padding: 10 }}>
              <Benefits
                benefits={this.props.benefits}
                ingredients={this.props.ingredients}
              />
            </div>
          </TabPanel>
          <TabPanel id="tab2" title="Where to buy">
            <WhereToBuy
              stores={this.props.stores}
              childProducts={this.props.childProducts}
              selectedChild={this.props.selectedChild}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
