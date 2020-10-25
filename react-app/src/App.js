import React, {useEffect} from 'react';
import './App.css';
import {Input, Layout, Menu, Breadcrumb, Table, Button, message, Modal } from 'antd';
import {addQueryString} from './utils/url'
const { TextArea } = Input;
const { Header, Content, Footer } = Layout;

class App extends React.Component{
    constructor () {
        super();
        this.clickAddBtn = this.clickAddBtn.bind(this);
        this.addList = this.addList.bind(this);
        this.listData = this.listData.bind(this);
        this.refreshTable = this.refreshTable.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.changeInputChapter = this.changeInputChapter.bind(this);
        this.changeInputKnownledge = this.changeInputKnownledge.bind(this);
        this.changeInputFileAddress = this.changeInputFileAddress.bind(this);
        this.state = { data: [],
            visible: false,
            value:'',
            chapter: '',
            knownledge: '',
            fileAddress: ''
        };
        this.columns = [
            {
                title: '章节',
                dataIndex: 'chapter',
                key: 'chapter',
            },{
                title: '知识点',
                dataIndex: 'knownledge',
                key: 'knownledge',
            },{
                title: '文件地址',
                dataIndex: 'fileAddress',
                key: 'fileAddress',
            },{
                title: 'zyz完成状况',
                dataIndex: 'zyzStatus',
                key: 'zyzStatus',
            },{
                title: 'amn完成状况',
                dataIndex: 'amnStatus',
                key: 'amnStatus',
            },{
                title: 'zyz备注',
                dataIndex: 'zyzRemarks',
                key: 'zyzRemarks',
            },{
                title: 'amn备注',
                dataIndex: 'amnRemarks',
                key: 'amnRemarks',
            },
           /* {
                title: '创建时间',
                key: 'action',
                render: (text, record) => (
                    <div>
                        {text.createTime}
                    </div>
                ),
            },*/
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <div>
                      <a href="#">编辑</a>
                        <span className="ant-divider">/</span>
                        <a onClick={() => this.deleteItem(text)}>删除</a>
                    </div>
                ),
            }
        ];

    }

    // 删除
    deleteItem(a) {
        let baseUrl = 'http://127.0.0.1:9000/deleteMenu';
        Object.keys(a).forEach(item => {
            baseUrl = addQueryString(baseUrl, item, a[item]);
        });
        console.log(baseUrl);
        fetch(baseUrl).then(
            (response) => {
                return response.json();
            }).then((data) => {
            console.log(data);
            message.success('操作成功');
            this.refreshTable();

        })
    }
    clickAddBtn () {
        this.listData();
    }
    componentDidMount() {
        this.listData();
    }

    refreshTable() {
        this.listData();
    }

    // 获取表格数据
    listData () {
        fetch("http://127.0.0.1:9000/server").then(
            (response) => {
                return response.json();
            }).then((data) => {
            console.log(data);
            this.setState({data: data});
            // this.updateTable()
        })
    }

    showModal() {
      this.setState({visible: true})
    }
    handleOk() {
      console.log(this.state);
      this.addList();
    }
    handleCancel() {
        this.setState({visible: false})
    }

    changeInputChapter(e) {
      this.setState( {chapter: e.target.value});
    }
    changeInputKnownledge(e) {
      this.setState( {knownledge: e.target.value});
    }
    changeInputFileAddress(e) {
      this.setState( {fileAddress: e.target.value});
    }

    addList() {
        const params = {
            chapter: this.state.chapter, // 章节
            knownledge: this.state.knownledge, // 知识点
            fileAddress: this.state.fileAddress, // 文件地址
            zyzStatus: 2, // zyz完成状况  1：完成 2：未来完成
            amnStatus: 2, // amn完成状况  1：完成 2：未来完成
            zyzRemarks: '', // zyz备注
            amnRemarks: '', // amn备注
            createTime: new Date()
        };
        let baseUrl = 'http://127.0.0.1:9000/addMenu';
        Object.keys(params).forEach(item => {
            baseUrl = addQueryString(baseUrl, item, params[item]);
        });
        console.log(baseUrl);
        fetch(baseUrl).then(
            (result) => {
                message.success('操作成功');
                this.setState({visible: false});
                this.refreshTable();
            }
        )
    }


  render () {
      return (
          <Layout className="layout">
              <Header>
                  <div className="logo" />
                  <Menu
                      theme="dark"
                      mode="horizontal"
                      defaultSelectedKeys={['1']}
                      style={{ lineHeight: '64px' }}
                  >
                      <Menu.Item key="1">主列表</Menu.Item>
                  </Menu>
              </Header>
              <Content style={{ padding: '0 50px' }}>
                  <div className="header-content">
                      <Breadcrumb style={{ margin: '16px 0' }}>
                          <Breadcrumb.Item>计划列表</Breadcrumb.Item>
                          <Breadcrumb.Item>计划列表</Breadcrumb.Item>
                      </Breadcrumb>
                      <Button type="link" onClick={this.showModal}>添加知识点</Button>
                      <Modal
                          title="添加知识点"
                          visible={this.state.visible}
                          onOk={this.handleOk}
                          onCancel={this.handleCancel}
                          footer={[
                              <Button key="back" onClick={this.handleCancel}>
                                  取消
                              </Button>,
                              <Button key="submit" type="primary"  onClick={this.handleOk}>
                                  确定
                              </Button>,
                          ]}
                      >
                        <div>
                            <div className="form-items">
                                <span className="title">所属章节名称:</span>
                                <Input value={this.state.chapter} onChange={this.changeInputChapter} placeholder="请输入"/>
                            </div>
                            <div className="form-items">
                                <span className="title">知识点名称:</span>
                                <TextArea rows={4} value={this.state.knownledge} onChange={this.changeInputKnownledge} placeholder="请输入"/>
                                {/*<Input value={this.state.knownledge} onChange={this.changeInputKnownledge} placeholder="请输入"/>*/}
                            </div>
                            <div className="form-items">
                                <span className="title">文件地址:</span>
                                <Input value={this.state.fileAddress} onChange={this.changeInputFileAddress} placeholder="请输入"/>
                            </div>
                        </div>

                      </Modal>
                  </div>

                  <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                      <Table columns={this.columns} dataSource={this.state.data} rowKey={columns=>columns._id} />
                  </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>

              </Footer>
          </Layout>
      );
  }
}


export default App;
