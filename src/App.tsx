import { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.scss';

import type { MenuProps } from 'antd';
import { HeartOutlined, EditOutlined, DeleteOutlined, MailOutlined, PhoneOutlined, GlobalOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Col, Row, Card, Button, Modal, BackTop } from 'antd';
import NavMain from './components/NavMain';
import request from './utils/request';

interface userObj {
  id?: number | string;
  username?: string;
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
}

const LOADER_CARDS = Array.from({ length: 6 }).map((v, i) => ({ id: i, username: '', name: '', email: '', phone: '', website: '' }));

function App() {
  const [theme, setTheme] = useState<MenuProps['theme']>('light');
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<Array<userObj>>([]);

  useEffect(() => {
    if (loading) {
      request('https://jsonplaceholder.typicode.com/users')
        .then((res: any) => {
          setUsers(res || []);
        })
        .catch(() => {
          
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [loading]);

  const onConfirmDelete = (val: userObj) => {
    Modal.confirm({
      centered: true,
      title: `Do you Want to delete user ${val.name} ?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setUsers(users.filter(f => f.id !== val.id));
      },
    })
  }

  return (
    <div className={"App theme-" + theme}>
      <NavMain
        theme={theme}
        onToggleTheme={setTheme}
      />

      <div className="p-3">
        <Row gutter={[16, 16]}>
          {(loading ? LOADER_CARDS : users).map((v: userObj) => 
            <Col
              key={v.id}
              xs={24}
              sm={24}
              md={8}
              lg={6}
              xl={6}
            >
              <Card
                loading={loading}
                className="shadow-sm card-user"
                cover={
                  <div className="bg-gray text-center">
                    <img
                      loading="lazy"
                      draggable="false"
                      height={200}
                      alt={v.name}
                      src={loading ? undefined : `https://avatars.dicebear.com/v2/avataaars/${v.username}.svg`}
                    />
                  </div>
                }
                actions={[
                  <Button
                    disabled={loading}
                    block
                    type="text"
                    size="large"
                    className="btn-flat-theme"
                    icon={<HeartOutlined className="text-red" />}
                  />,
                  <Button
                    disabled={loading}
                    block
                    type="text"
                    size="large"
                    className="btn-flat-theme"
                    icon={<EditOutlined />}
                  />,
                  <Button
                    disabled={loading}
                    block
                    type="text"
                    size="large"
                    className="btn-flat-theme"
                    icon={<DeleteOutlined key="delete" />}
                    onClick={() => onConfirmDelete(v)}
                  />,
                ]}
              >
                <Card.Meta
                  title={v.name}
                  description={
                    <>
                      <div>
                        <a
                          href={`mailto:${v.email}`}
                          className="link-dark"
                        >
                          <MailOutlined className="mr-2" />
                          {v.email}
                        </a>
                      </div>
                      <div>
                        <a
                          href={`tel:${v.phone}`}
                          className="link-dark"
                        >
                          <PhoneOutlined className="mr-2" />
                          {v.phone}
                        </a>
                      </div>
                      <div>
                        <a
                          href={`http://${v.website}`}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="link-dark"
                        >
                          <GlobalOutlined className="mr-2" />
                          http://{v.website}
                        </a>
                      </div>
                    </>
                  }
                />
              </Card>
            </Col>
          )}
        </Row>
      </div>

      <BackTop className="backTopMain" />
    </div>
  )
}

export default App
