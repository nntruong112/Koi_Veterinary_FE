import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=2bef24d1"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=2bef24d1"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react;
import __vite__cjsImport2_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=2bef24d1"; const createRoot = __vite__cjsImport2_reactDom_client["createRoot"];
import "/src/index.css?t=1729351564177";
import { Provider } from "/node_modules/.vite/deps/react-redux.js?v=2bef24d1";
import { store, persistor } from "/src/redux/store/store.js?t=1729351303400";
import { GoogleOAuthProvider } from "/node_modules/.vite/deps/@react-oauth_google.js?v=2bef24d1";
import { RouterProvider } from "/node_modules/.vite/deps/react-router-dom.js?v=2bef24d1";
import routes from "/src/routes/combineRoutes.jsx?t=1729351564177";
import { PersistGate } from "/node_modules/.vite/deps/redux-persist_integration_react.js?v=2bef24d1";
import { ToastContainer } from "/node_modules/.vite/deps/react-toastify.js?v=2bef24d1";
import "/node_modules/react-toastify/dist/ReactToastify.css";
import AppContextProvider from "/src/context/AppContext.jsx";
const root = createRoot(document.getElementById("root"));
root.render(
  /* @__PURE__ */ jsxDEV(Provider, { store, children: /* @__PURE__ */ jsxDEV(AppContextProvider, { children: /* @__PURE__ */ jsxDEV(PersistGate, { loading: null, persistor, children: /* @__PURE__ */ jsxDEV(GoogleOAuthProvider, { clientId: "333028122679-8qui3jtdf79sm38ft0rqnrgnbvuhmrs5.apps.googleusercontent.com", children: [
    /* @__PURE__ */ jsxDEV(RouterProvider, { router: routes }, void 0, false, {
      fileName: "C:/Users/Dell/Documents/Website/Koi-Heath-Services/src/main.jsx",
      lineNumber: 20,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV(ToastContainer, {}, void 0, false, {
      fileName: "C:/Users/Dell/Documents/Website/Koi-Heath-Services/src/main.jsx",
      lineNumber: 21,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Dell/Documents/Website/Koi-Heath-Services/src/main.jsx",
    lineNumber: 19,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "C:/Users/Dell/Documents/Website/Koi-Heath-Services/src/main.jsx",
    lineNumber: 18,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/Dell/Documents/Website/Koi-Heath-Services/src/main.jsx",
    lineNumber: 17,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "C:/Users/Dell/Documents/Website/Koi-Heath-Services/src/main.jsx",
    lineNumber: 16,
    columnNumber: 3
  }, this)
);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBbUJVO0FBbkJWLE9BQU9BLFdBQVc7QUFDbEIsU0FBU0Msa0JBQWtCO0FBQzNCLE9BQU87QUFDUCxTQUFTQyxnQkFBZ0I7QUFDekIsU0FBU0MsT0FBT0MsaUJBQWlCO0FBQ2pDLFNBQVNDLDJCQUEyQjtBQUNwQyxTQUFTQyxzQkFBc0I7QUFDL0IsT0FBT0MsWUFBWTtBQUNuQixTQUFTQyxtQkFBbUI7QUFDNUIsU0FBU0Msc0JBQXNCO0FBQy9CLE9BQU87QUFDUCxPQUFPQyx3QkFBd0I7QUFFL0IsTUFBTUMsT0FBT1YsV0FBV1csU0FBU0MsZUFBZSxNQUFNLENBQUM7QUFDdkRGLEtBQUtHO0FBQUFBLEVBQ0gsdUJBQUMsWUFBUyxPQUNSLGlDQUFDLHNCQUNDLGlDQUFDLGVBQVksU0FBUyxNQUFNLFdBQzFCLGlDQUFDLHVCQUFvQixVQUFTLDRFQUM1QjtBQUFBLDJCQUFDLGtCQUFlLFFBQVFQLFVBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBK0I7QUFBQSxJQUMvQix1QkFBQyxvQkFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQWU7QUFBQSxPQUZqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBR0EsS0FKRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBS0EsS0FORjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBT0EsS0FSRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBU0E7QUFDRiIsIm5hbWVzIjpbIlJlYWN0IiwiY3JlYXRlUm9vdCIsIlByb3ZpZGVyIiwic3RvcmUiLCJwZXJzaXN0b3IiLCJHb29nbGVPQXV0aFByb3ZpZGVyIiwiUm91dGVyUHJvdmlkZXIiLCJyb3V0ZXMiLCJQZXJzaXN0R2F0ZSIsIlRvYXN0Q29udGFpbmVyIiwiQXBwQ29udGV4dFByb3ZpZGVyIiwicm9vdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW5kZXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsibWFpbi5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVSb290IH0gZnJvbSBcInJlYWN0LWRvbS9jbGllbnRcIjtcclxuaW1wb3J0IFwiLi9pbmRleC5jc3NcIjtcclxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHsgc3RvcmUsIHBlcnNpc3RvciB9IGZyb20gXCIuL3JlZHV4L3N0b3JlL3N0b3JlLmpzXCI7XHJcbmltcG9ydCB7IEdvb2dsZU9BdXRoUHJvdmlkZXIgfSBmcm9tIFwiQHJlYWN0LW9hdXRoL2dvb2dsZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJQcm92aWRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XHJcbmltcG9ydCByb3V0ZXMgZnJvbSBcIi4vcm91dGVzL2NvbWJpbmVSb3V0ZXMuanN4XCI7XHJcbmltcG9ydCB7IFBlcnNpc3RHYXRlIH0gZnJvbSBcInJlZHV4LXBlcnNpc3QvaW50ZWdyYXRpb24vcmVhY3RcIjtcclxuaW1wb3J0IHsgVG9hc3RDb250YWluZXIgfSBmcm9tIFwicmVhY3QtdG9hc3RpZnlcIjtcclxuaW1wb3J0IFwicmVhY3QtdG9hc3RpZnkvZGlzdC9SZWFjdFRvYXN0aWZ5LmNzc1wiO1xyXG5pbXBvcnQgQXBwQ29udGV4dFByb3ZpZGVyIGZyb20gXCIuL2NvbnRleHQvQXBwQ29udGV4dC5qc3hcIjtcclxuXHJcbmNvbnN0IHJvb3QgPSBjcmVhdGVSb290KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSk7XHJcbnJvb3QucmVuZGVyKFxyXG4gIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxyXG4gICAgPEFwcENvbnRleHRQcm92aWRlcj5cclxuICAgICAgPFBlcnNpc3RHYXRlIGxvYWRpbmc9e251bGx9IHBlcnNpc3Rvcj17cGVyc2lzdG9yfT5cclxuICAgICAgICA8R29vZ2xlT0F1dGhQcm92aWRlciBjbGllbnRJZD1cIjMzMzAyODEyMjY3OS04cXVpM2p0ZGY3OXNtMzhmdDBycW5yZ25idnVobXJzNS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwiPlxyXG4gICAgICAgICAgPFJvdXRlclByb3ZpZGVyIHJvdXRlcj17cm91dGVzfSAvPlxyXG4gICAgICAgICAgPFRvYXN0Q29udGFpbmVyIC8+XHJcbiAgICAgICAgPC9Hb29nbGVPQXV0aFByb3ZpZGVyPlxyXG4gICAgICA8L1BlcnNpc3RHYXRlPlxyXG4gICAgPC9BcHBDb250ZXh0UHJvdmlkZXI+XHJcbiAgPC9Qcm92aWRlcj5cclxuKTtcclxuIl0sImZpbGUiOiJDOi9Vc2Vycy9EZWxsL0RvY3VtZW50cy9XZWJzaXRlL0tvaS1IZWF0aC1TZXJ2aWNlcy9zcmMvbWFpbi5qc3gifQ==