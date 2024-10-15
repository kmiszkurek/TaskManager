/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteProject } from '../fn/project/delete-project';
import { DeleteProject$Params } from '../fn/project/delete-project';
import { editProject } from '../fn/project/edit-project';
import { EditProject$Params } from '../fn/project/edit-project';
import { findAllCompletedProjects } from '../fn/project/find-all-completed-projects';
import { FindAllCompletedProjects$Params } from '../fn/project/find-all-completed-projects';
import { findAllProjects } from '../fn/project/find-all-projects';
import { FindAllProjects$Params } from '../fn/project/find-all-projects';
import { findAllProjectsByOwner } from '../fn/project/find-all-projects-by-owner';
import { FindAllProjectsByOwner$Params } from '../fn/project/find-all-projects-by-owner';
import { findProjectById } from '../fn/project/find-project-by-id';
import { FindProjectById$Params } from '../fn/project/find-project-by-id';
import { getEndingProjects } from '../fn/project/get-ending-projects';
import { GetEndingProjects$Params } from '../fn/project/get-ending-projects';
import { markProjectAsCompleted } from '../fn/project/mark-project-as-completed';
import { MarkProjectAsCompleted$Params } from '../fn/project/mark-project-as-completed';
import { PageResponseCompletedProjectsResponse } from '../models/page-response-completed-projects-response';
import { PageResponseProjectResponse } from '../models/page-response-project-response';
import { ProjectResponse } from '../models/project-response';
import { saveProject } from '../fn/project/save-project';
import { SaveProject$Params } from '../fn/project/save-project';
import { searchByNameContainingIgnoreCase } from '../fn/project/search-by-name-containing-ignore-case';
import { SearchByNameContainingIgnoreCase$Params } from '../fn/project/search-by-name-containing-ignore-case';

@Injectable({ providedIn: 'root' })
export class ProjectService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllProjects()` */
  static readonly FindAllProjectsPath = '/project';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllProjects()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllProjects$Response(params?: FindAllProjects$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProjectResponse>> {
    return findAllProjects(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllProjects$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllProjects(params?: FindAllProjects$Params, context?: HttpContext): Observable<PageResponseProjectResponse> {
    return this.findAllProjects$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseProjectResponse>): PageResponseProjectResponse => r.body)
    );
  }

  /** Path part for operation `saveProject()` */
  static readonly SaveProjectPath = '/project';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveProject()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveProject$Response(params: SaveProject$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveProject(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveProject$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveProject(params: SaveProject$Params, context?: HttpContext): Observable<number> {
    return this.saveProject$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `editProject()` */
  static readonly EditProjectPath = '/project/edit-project/{project-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editProject()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editProject$Response(params: EditProject$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return editProject(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editProject$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editProject(params: EditProject$Params, context?: HttpContext): Observable<number> {
    return this.editProject$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `deleteProject()` */
  static readonly DeleteProjectPath = '/project/delete/{project-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProject()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProject$Response(params: DeleteProject$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return deleteProject(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteProject$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProject(params: DeleteProject$Params, context?: HttpContext): Observable<number> {
    return this.deleteProject$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `markProjectAsCompleted()` */
  static readonly MarkProjectAsCompletedPath = '/project/completed/{project-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `markProjectAsCompleted()` instead.
   *
   * This method doesn't expect any request body.
   */
  markProjectAsCompleted$Response(params: MarkProjectAsCompleted$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return markProjectAsCompleted(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `markProjectAsCompleted$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  markProjectAsCompleted(params: MarkProjectAsCompleted$Params, context?: HttpContext): Observable<number> {
    return this.markProjectAsCompleted$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findProjectById()` */
  static readonly FindProjectByIdPath = '/project/{project-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findProjectById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findProjectById$Response(params: FindProjectById$Params, context?: HttpContext): Observable<StrictHttpResponse<ProjectResponse>> {
    return findProjectById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findProjectById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findProjectById(params: FindProjectById$Params, context?: HttpContext): Observable<ProjectResponse> {
    return this.findProjectById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProjectResponse>): ProjectResponse => r.body)
    );
  }

  /** Path part for operation `searchByNameContainingIgnoreCase()` */
  static readonly SearchByNameContainingIgnoreCasePath = '/project/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchByNameContainingIgnoreCase()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchByNameContainingIgnoreCase$Response(params: SearchByNameContainingIgnoreCase$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProjectResponse>> {
    return searchByNameContainingIgnoreCase(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchByNameContainingIgnoreCase$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchByNameContainingIgnoreCase(params: SearchByNameContainingIgnoreCase$Params, context?: HttpContext): Observable<PageResponseProjectResponse> {
    return this.searchByNameContainingIgnoreCase$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseProjectResponse>): PageResponseProjectResponse => r.body)
    );
  }

  /** Path part for operation `findAllProjectsByOwner()` */
  static readonly FindAllProjectsByOwnerPath = '/project/owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllProjectsByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllProjectsByOwner$Response(params?: FindAllProjectsByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProjectResponse>> {
    return findAllProjectsByOwner(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllProjectsByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllProjectsByOwner(params?: FindAllProjectsByOwner$Params, context?: HttpContext): Observable<PageResponseProjectResponse> {
    return this.findAllProjectsByOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseProjectResponse>): PageResponseProjectResponse => r.body)
    );
  }

  /** Path part for operation `getEndingProjects()` */
  static readonly GetEndingProjectsPath = '/project/ending';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEndingProjects()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEndingProjects$Response(params?: GetEndingProjects$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProjectResponse>> {
    return getEndingProjects(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getEndingProjects$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEndingProjects(params?: GetEndingProjects$Params, context?: HttpContext): Observable<PageResponseProjectResponse> {
    return this.getEndingProjects$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseProjectResponse>): PageResponseProjectResponse => r.body)
    );
  }

  /** Path part for operation `findAllCompletedProjects()` */
  static readonly FindAllCompletedProjectsPath = '/project/completed';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllCompletedProjects()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCompletedProjects$Response(params?: FindAllCompletedProjects$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCompletedProjectsResponse>> {
    return findAllCompletedProjects(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllCompletedProjects$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCompletedProjects(params?: FindAllCompletedProjects$Params, context?: HttpContext): Observable<PageResponseCompletedProjectsResponse> {
    return this.findAllCompletedProjects$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseCompletedProjectsResponse>): PageResponseCompletedProjectsResponse => r.body)
    );
  }

}