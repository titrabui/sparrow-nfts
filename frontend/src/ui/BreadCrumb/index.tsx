
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItemProps } from "antd";

const BreadCrumb: React.FC<BreadcrumbItemProps> = () => {
  const location = useLocation();
  const {pathname} = location;
  const pathnames = pathname.split('/').filter(item => item);
  const capatilize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div>
        <Breadcrumb>
          {pathnames.length > 0 ? (
            <Breadcrumb.Item>
              <Link to='/'>Home</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          )}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1)}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Breadcrumb.Item>{capatilize(name)}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item>
                <Link to={`${routeTo}`}>{capatilize(name)}</Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
  )
}

export default BreadCrumb;
